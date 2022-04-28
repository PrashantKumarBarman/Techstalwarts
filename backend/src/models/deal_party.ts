import { DataTypes } from 'sequelize';
import sequelize from '../lib/sequelize';
import partyModel from './party';
import dealModel from './deal';

let model = sequelize.define('deal_party', {
    deal_id: {
        type: DataTypes.INTEGER,
        references: {
            model: dealModel.model,
            key: 'id'
        },
        primaryKey: true
    },
    party_id: {
        type: DataTypes.INTEGER,
        references: {
            model: partyModel.model,
            key: 'id'
        },
        primaryKey: true
    }
});

(async function() {
    try {
        
    }
    catch(err) {
        console.log(err);
    }
})();

export default {
    model: model
}