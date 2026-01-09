import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Produk from "./ProdukModel.js";

const { DataTypes } = Sequelize;

const Transaksi = db.define('transactions', {
    qty: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_price: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps:false
});

// Relasi
Produk.hasMany(Transaksi, {
    foreignKey: "product_id",
});
Transaksi.belongsTo(Produk, {
    foreignKey: "product_id",
});


export default Transaksi;
