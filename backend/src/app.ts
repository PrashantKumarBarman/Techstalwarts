import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import dealRouter from './routes/deal';
import sequelize from './lib/sequelize';
import { listen } from './lib/ftpServer';

let app = express();

let port: number = (process.env.PORT || 3000) as number;

app.use(express.json({ limit: 1048576 }));

app.use('/deal', dealRouter);

sequelize.sync();

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
})

// Starting ftp server
listen();

