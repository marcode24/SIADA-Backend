const { Sequelize } = require('sequelize');
const userDB = process.env.USERDB;
const passDB = process.env.PASSDB

const database = new Sequelize('SIADA', userDB, passDB, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const dbConnection = async() => {
    try {
        await database.authenticate();
        console.log('DB connected');
    } catch (error) {
        console.log('error to connect to the database', error);
    }
}

module.exports = {
    dbConnection,
    database
};
