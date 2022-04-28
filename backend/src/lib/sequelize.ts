import { Sequelize } from "sequelize";

const sequelize = new Sequelize('', '', '', {
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: (process.env.MYSQL_PORT ? process.env.MYSQL_PORT : 3306) as number,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    dialect: 'mysql'
});

(async function() {
    try {
        await sequelize.authenticate();
        console.log('Mysql database connection established successfully');
    }
    catch(err) {
        console.log('Mysql database connection failed: ', err);
    }
})();

export default sequelize;