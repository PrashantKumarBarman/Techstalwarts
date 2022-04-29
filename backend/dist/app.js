"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const deal_1 = __importDefault(require("./routes/deal"));
const sequelize_1 = __importDefault(require("./lib/sequelize"));
const ftpServer_1 = require("./lib/ftpServer");
let app = (0, express_1.default)();
let port = (process.env.PORT || 3000);
app.use(express_1.default.json({ limit: 1048576 }));
app.use('/deal', deal_1.default);
sequelize_1.default.sync();
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
// Starting ftp server
(0, ftpServer_1.listen)();
