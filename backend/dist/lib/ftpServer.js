"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = void 0;
const FtpSrv = require('ftp-srv');
const path_1 = __importDefault(require("path"));
const port = 21;
const ftpServer = new FtpSrv({
    host: 'ftp://127.0.0.1:' + port,
    anonymous: false,
    whitelist: ['ls', 'put', 'PASV', 'USER', 'PASS', 'STOR', 'LIST'],
    pasv_url: 'ftp://127.0.0.1:' + port
});
ftpServer.on('login', (data, resolve, reject) => {
    if (data.username === process.env.FTP_USER && data.password === process.env.FTP_PASSWORD) {
        let ftpPath = path_1.default.join(__dirname, '..', '..', 'ftp');
        return resolve({ root: ftpPath });
    }
    return reject(new Error('Invalid username or password'));
});
function listen() {
    ftpServer.listen().then(() => {
        console.log('Ftp server is starting...');
    });
}
exports.listen = listen;
