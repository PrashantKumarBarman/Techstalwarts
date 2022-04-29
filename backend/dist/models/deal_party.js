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
const party_1 = __importDefault(require("./party"));
const deal_1 = __importDefault(require("./deal"));
let model = sequelize_2.default.define('deal_party', {
    deal_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: deal_1.default.model,
            key: 'id'
        },
        primaryKey: true
    },
    party_id: {
        type: sequelize_1.DataTypes.INTEGER,
        references: {
            model: party_1.default.model,
            key: 'id'
        },
        primaryKey: true
    }
});
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        try {
        }
        catch (err) {
            console.log(err);
        }
    });
})();
exports.default = {
    model: model
};
