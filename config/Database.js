import { Sequelize } from 'sequelize';

const db = new Sequelize('dbkasir', 'root', '', {
    host: 'localhost' ,
    dialect: 'mysql' ,
});

export default db;