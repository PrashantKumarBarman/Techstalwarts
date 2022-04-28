import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../lib/sequelize';
import stateModel from './state';
import partyModel, { Party } from './party';
import { State } from './state';

export interface Deal extends Model<InferAttributes<Deal>, InferCreationAttributes<Deal>> {
    id: number,
    product: string,
    agreement_date: Date,
    facility_letter_date: Date,
    sanction_letter_date: Date,
    account_name: string,
    state_id?: number,
    details_of_receivable: string,
    status: string,
    state?: State,
    parties?: Party[]
}

let model = sequelize.define('deal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product: {
        type: DataTypes.STRING,
        allowNull: false
    },
    agreement_date: {
        type: DataTypes.DATE
    },
    facility_letter_date: {
        type: DataTypes.DATE
    },
    sanction_letter_date: {
        type: DataTypes.DATE
    },
    account_name: {
        type: DataTypes.STRING
    },
    state_id: {
        type: DataTypes.INTEGER,
        references: {
            model: stateModel.model,
            key: 'id'
        }
    },
    details_of_receivable: {
        type: DataTypes.TEXT
    },
    attachment: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.STRING
    }
});

(async function() {
    try {
        model.belongsTo(stateModel.model, { foreignKey: 'state_id' });
        model.belongsToMany(partyModel.model, { through:'deal_party' });
    }
    catch(err) {
        console.log(err);
    }
})();

export default {
    model: model,
    getDeal: async function() : Promise<Deal> {
        let deal: Deal = (await model.findAll({ 
            attributes: ['id', 'product', 'agreement_date', 'facility_letter_date', 'sanction_letter_date', 'account_name', 'details_of_receivable', 'status'],
            order: [['id', 'DESC']], 
            limit: 1, 
            include: [
                { 
                    model: partyModel.model,
                    attributes: ['name', 'email', 'mobile', 'type', 'consultant_type', 'signatory_name', 'party_address', 'branch'], 
                    required: true,
                    as: 'parties',
                    through: {
                        attributes: []
                    }
                },
                {
                    model: stateModel.model,
                    attributes: ['state'],
                    required: true,
                    where: {
                        id: Sequelize.col('deal.state_id')
                    },
                    as: 'state'
                }
            ], 
        }))[0] as Deal;
        return deal;
    },
    updateById: async function(dealId: number, updateObj: any) {
        try {
            await model.update(updateObj, { where: { id: dealId } });
        }
        catch(err: any) {
            console.log(err);
            throw new Error(err);
        }
    },
    cancelDealById: async function(dealId: number) {
        try {
            await model.update({ status: 'cancelled' }, { where: { id: dealId } });
        }
        catch(err: any) {
            console.log(err);
            throw new Error(err);
        }
    }
}