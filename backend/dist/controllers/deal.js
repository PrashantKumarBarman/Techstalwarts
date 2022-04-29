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
const deal_1 = __importDefault(require("../models/deal"));
const nanoid_1 = require("nanoid");
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const ftpClient_1 = require("../lib/ftpClient");
let pdf = require('pdf-creator-node');
function uploadDealAttachment(attachment) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let data = Buffer.from(attachment.data.split(',')[1], 'base64');
            let fileExtension = attachment.extension;
            let fileName = (0, nanoid_1.nanoid)() + '.' + fileExtension;
            let filePath = path_1.default.join(__dirname, '..', '..', 'media', fileName);
            yield promises_1.default.writeFile(filePath, data);
            return fileName;
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    });
}
function generateAgreementPDF(deal, fileName, attachment) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let html = yield promises_1.default.readFile(path_1.default.join(__dirname, '..', '..', 'templates', 'agreement.html'));
            let filePath = path_1.default.join(__dirname, '..', '..', 'media', `${fileName}.pdf`);
            let document = {
                html: html.toString(),
                data: {
                    deal: deal,
                    attachment: attachment
                },
                path: filePath,
                type: "",
            };
            let result = yield pdf.create(document, {});
            return { filePath: filePath, fileName: fileName };
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    });
}
exports.default = {
    getDeal: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json(yield deal_1.default.getDeal());
            }
            catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        });
    },
    generateAgreement: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let attachment = '';
                let updateObj = {};
                if (req.body.attachment) {
                    attachment = yield uploadDealAttachment(req.body.attachment);
                    updateObj['attachment'] = attachment;
                }
                let result = yield generateAgreementPDF(req.body, req.body.id, attachment);
                // uploading pdf to ftp server
                yield (0, ftpClient_1.upload)(result.filePath, `${result.fileName}.pdf`);
                updateObj['status'] = 'done';
                yield deal_1.default.updateById(req.body.id, updateObj);
                res.sendStatus(200);
            }
            catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        });
    },
    cancelDeal: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield deal_1.default.cancelDealById(Number(req.params.id));
                res.sendStatus(200);
            }
            catch (err) {
                console.log(err);
                res.sendStatus(500);
            }
        });
    }
};
