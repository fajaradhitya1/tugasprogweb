import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define(
    'users',
    {
        name: {
            type: DataTypes.STRING,
            notNull: true,
        },
        email: {
            type: DataTypes.STRING,
            notNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            notNull: false,
        },
        
    },
    {
        freezeTableName: true,
    }
);

export default Users;