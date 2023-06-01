module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: "product_id",
            },
            category: {
                type: DataTypes.INTEGER,
                // allowNull: false,
                field: "category_id",
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            firm: {
                // hãng
                type: DataTypes.STRING,
                allowNull: true,
                field: "firm_id",
            },
            code: {
                // mã sản phẩm
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                //trạng thái
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            origin: {
                //xuất xứ
                type: DataTypes.STRING,
                allowNull: false,
            },
            wattage: {
                //công suất
                type: DataTypes.STRING,
                allowNull: false,
            },
            guarantee: {
                // bảo hành
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                // allowNull: false,
            },
            feature: {
                // chức năng chính
                type: DataTypes.STRING,
                // allowNull: false,
            },
            img: {
                type: DataTypes.STRING,
                get: function() {
                    return JSON.parse(this.getDataValue('img_product'));
                },
                set: function(val) {
                    return this.setDataValue('img_product', JSON.stringify(val));
                }
            }
        },{
            tableName: "Product",
        }
    );
