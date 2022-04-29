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
exports.upload = void 0;
const jsftp = require("jsftp");
const promises_1 = __importDefault(require("fs/promises"));
const Ftp = new jsftp({
    host: 'localhost',
    user: process.env.FTP_USER,
    pass: process.env.FTP_PASSWORD,
    debugMode: true
});
try {
    login();
}
catch (err) {
    console.log(err);
}
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            Ftp.auth(process.env.FTP_USER, process.env.FTP_PASSWORD, function (error) {
                if (error) {
                    console.log(error);
                    reject(error);
                }
                else {
                    resolve();
                }
            });
        });
    });
}
function upload(filePath, fileName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let buffer = yield promises_1.default.readFile(filePath);
            Ftp.put(buffer, fileName, (err) => {
                if (!err) {
                    console.log("File transferred successfully!");
                }
                else {
                    console.log(err);
                    throw new Error(err);
                }
            });
        }
        catch (err) {
            console.log(err);
            throw new Error(err);
        }
    });
}
exports.upload = upload;
