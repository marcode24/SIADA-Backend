const { DataTypes } = require('sequelize');
const { database } = require('../db/config');

const Product = database.define('Product', {
    productCode: { type: DataTypes.BIGINT },
    productName: { type: DataTypes.STRING },
    stock: { type: DataTypes.NUMBER },
    price: { type: DataTypes.DOUBLE },
    enabled: { type: DataTypes.BOOLEAN },
})
module.exports = Product;