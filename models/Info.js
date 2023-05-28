module.exports = (sequelize, DataTypes) =>
    sequelize.define(
        "Info",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: "info_ID",
            },
            productID: {
                type: DataTypes.INTEGER,
                // allowNull: false,
                field: "product_id",
            },
            cong_suat: {
                type: DataTypes.STRING,
            },
        
            // thông số đầu vào
            dai_dien_ap: {
                type: DataTypes.STRING,
            },
            tan_so_vao: {
                type: DataTypes.STRING,
            },
            so_pha: {
                type: DataTypes.STRING,
            },
        
            // thông số đầu ra
            dien_ap: {
                type: DataTypes.STRING,
            },
            dien_ap_che_do_ac_quy: {
                type: DataTypes.STRING,
            },
            tan_so_ra: {
                type: DataTypes.STRING,
            },
            dang_song: {
                type: DataTypes.STRING,
            },
            thoi_gian_chuyen_mach: {
                type: DataTypes.STRING,
            },
        
            // Thông số ắc quy
            loai_ac_quy: {
                type: DataTypes.STRING,
            },
            thoi_gian_sac: {
                type: DataTypes.STRING,
            },
        
            // Chức năng bảo vệ
            bv_ngan_mach: {
                type: DataTypes.STRING,
            },
            bv_xung: {
                type: DataTypes.STRING,
            },
            canh_bao: {
                type: DataTypes.STRING,
            },
            bv_qua_tai: {
                type: DataTypes.STRING,
            },
            quan_ly_ac_quy: {
                type: DataTypes.STRING,
            },
        
            // kết nối
            cong_USB: {
                type: DataTypes.STRING,
            },
        
            //Môi trường hoạt động
            do_on_hd: {
                type: DataTypes.STRING,
            },
            nhiet_do_hd: {
                type: DataTypes.STRING,
            },
            do_am_hd: {
                type: DataTypes.STRING,
            },
            he_so_cong_suat: {
                type: DataTypes.STRING,
            },
        
            // Thông số vật lý
            kich_thuoc: {
                type: DataTypes.STRING,
            },
            trong_luong: {
                type: DataTypes.STRING,
            },
        },
        {
            tableName: "Info",
        }
    );
