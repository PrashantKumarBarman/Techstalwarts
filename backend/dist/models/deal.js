"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../lib/sequelize"));
const state_1 = __importDefault(require("./state"));
const party_1 = __importDefault(require("./party"));
let model = sequelize_2.default.define('deal', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    product: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    agreement_date: {
        type: sequelize_1.DataTypes.DATE
    },
    facility_letter_date: {
        type: sequelize_1.DataTypes.DATE
    },
    sanction_letter_date: {
        type: sequelize_1.DataTypes.DATE
    },
    account_name: {
        type: sequelize_1.DataTypes.STRING
    },
    state_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: state_1.default.model,
            key: 'id'
        }
    },
    details_of_receivable: {
        type: sequelize_1.DataTypes.TEXT
    },
    attachment: {
        type: sequelize_1.DataTypes.STRING
    },
    status: {
        type: sequelize_1.DataTypes.STRING
    }
});
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            model.belongsTo(state_1.default.model, { foreignKey: 'state_id' });
            model.belongsToMany(party_1.default.model, { through: 'deal_party' });
        }
        catch (err) {
            console.log(err);
        }
    });
})();
exports.default = {
    model: model,
    getDeal: function () {
        return __awaiter(this, void 0, void 0, function* () {
            let deal = (yield model.findAll({
                attributes: ['id', 'product', 'agreement_date', 'facility_letter_date', 'sanction_letter_date', 'account_name', 'details_of_receivable', 'status'],
                order: [['id', 'DESC']],
                limit: 1,
                include: [
                    {
                        model: party_1.default.model,
                        attributes: ['name', 'email', 'mobile', 'type', 'consultant_type', 'signatory_name', 'party_address', 'branch'],
                        required: true,
                        as: 'parties',
                        through: {
                            attributes: []
                        }
                    },
                    {
                        model: state_1.default.model,
                        attributes: ['state'],
                        required: true,
                        where: {
                            id: sequelize_1.Sequelize.col('deal.state_id')
                        },
                        as: 'state'
                    }
                ],
            }))[0];
            return deal;
        });
    },
    updateById: function (dealId, updateObj) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model.update(updateObj, { where: { id: dealId } });
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    },
    cancelDealById: function (dealId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield model.update({ status: 'cancelled' }, { where: { id: dealId } });
            }
            catch (err) {
                console.log(err);
                throw new Error(err);
            }
        });
    }
};
