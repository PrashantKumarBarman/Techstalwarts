"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deal_1 = __importDefault(require("../controllers/deal"));
let router = express_1.default.Router();
router.put('/cancel/:id', deal_1.default.cancelDeal);
router.post('/agreement', deal_1.default.generateAgreement);
router.get('/', deal_1.default.getDeal);
exports.default = router;
