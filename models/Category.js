module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        "Category",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: "category_id",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: "name",
            },
            parent: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            Characteristic: {
                // đặc trưng
                type: DataTypes.STRING,
            },
            benefit: {
                type: DataTypes.STRING,
            },
        },{
            tableName: "Category",
        }
    );