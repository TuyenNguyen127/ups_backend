const sequelize = require("../config/db.js");
const { DataTypes } = require("sequelize");

const AccountModel = require("./Account.js");
const FirmModel = require("./Firm.js");
const ProductModel = require("./Product.js");
const InfoModel = require("./Info.js");
const CategoryModel = require("./Category.js");

const Account = AccountModel(sequelize, DataTypes);
const Firm = FirmModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const Info = InfoModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);

Firm.hasMany(Product, {
    foreignKey: "firm_id",
    allowNull: true,
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
});

Category.hasMany(Product, {
    foreignKey: "category_id",
    allowNull: true,
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
});

Product.hasOne(Info, {
    foreignKey: "product_id",
    allowNull: false,
});

module.exports = {
    Account,
    Product,
    Category,
    Firm,
    Info,
};
