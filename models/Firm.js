const { Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        "Firm",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: "firm_id",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "name",
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            img: {
                type: DataTypes.STRING,
                get: function() {
                    return JSON.parse(this.getDataValue('img'));
                },
                set: function(val) {
                    return this.setDataValue('img', JSON.stringify(val));
                }
            }
        },{
            tableName: "Firm",
        }
    );
