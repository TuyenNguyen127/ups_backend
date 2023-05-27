module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        "Parent",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: "parent_id",
            },
            parent: {
                type: DataTypes.INTEGER,
                allowNull: true,
                field: "category_id",
            }
        },{
            tableName: "Parent",
        }
    );
