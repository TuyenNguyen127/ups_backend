const { Info } = require("../models");
const Product = require("../models/Product");

const getInfoProduct = async (req, res, next) => {
    try {
        const productInfo = await Info.findOne({
            where: {
                productID: req.params.id,
            },
        });
        return res.status(200).json(productInfo);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const updateInfoProduct = async (req, res, next) => {
    try {
        const update = await Info.update(
            {
                cong_suat: req.body.cong_suat, 
                dai_dien_ap: req.body.dai_dien_ap, 
                tan_so_vao: req.body.tan_so_ra, 
                so_pha: req.body.so_pha, 
                dien_ap: req.body.dien_ap, 
                dien_ap_che_do_ac_quy: req.body.dien_ap_che_do_ac_quy, 
                tan_so_ra: req.body.tan_so_ra, 
                dang_song: req.body.dang_song, 
                thoi_gian_chuyen_mach: req.body.thoi_gian_chuyen_mach, 
                loai_ac_quy: req.body.loai_ac_quy, 
                thoi_gian_sac: req.body.thoi_gian_sac, 
                bv_ngan_mach: req.body.bv_ngan_mach, 
                bv_xung: req.body.bv_xung,
                canh_bao: req.body.canh_bao, 
                bv_qua_tai: req.body.bv_qua_tai, 
                quan_ly_ac_quy: req.body.quan_ly_ac_quy, 
                cong_USB: req.body.cong_USB, 
                do_on_hd: req.body.do_on_hd, 
                nhiet_do_hd: req.body.nhiet_do_hd, 
                do_am_hd: req.body.do_am_hd, 
                he_so_cong_suat: req.body.he_so_cong_suat, 
                kich_thuoc: req.body.kich_thuoc, 
                trong_luong: req.body.trong_luong
            },
            {
                where: {
                    productID: req.params.id,
                },
            }
        );

        if (!update[0]) {
            return next({
                message: `update product Info failed for productId - ${req.params.id}`,
            });
        }

        return res.status(200).send({
            success: true,
        });
    } catch (error) {
        res.json(error);
        return next(error);
    }
};

const createInfo = async (req, res, next) => {
    try {
        const i = await Info.findOne({where: {productID: req.params.id}})
        if (i) return res.status(400).json({message: 'Info product is exits'})
        const info = await Info.create(
            {
                productID: req.params.id,
                cong_suat: req.body.cong_suat, 
                dai_dien_ap: req.body.dai_dien_ap, 
                tan_so_vao: req.body.tan_so_ra, 
                so_pha: req.body.so_pha, 
                dien_ap: req.body.dien_ap, 
                dien_ap_che_do_ac_quy: req.body.dien_ap_che_do_ac_quy, 
                tan_so_ra: req.body.tan_so_ra, 
                dang_song: req.body.dang_song, 
                thoi_gian_chuyen_mach: req.body.thoi_gian_chuyen_mach, 
                loai_ac_quy: req.body.loai_ac_quy, 
                thoi_gian_sac: req.body.thoi_gian_sac, 
                bv_ngan_mach: req.body.bv_ngan_mach, 
                bv_xung: req.body.bv_xung,
                canh_bao: req.body.canh_bao, 
                bv_qua_tai: req.body.bv_qua_tai, 
                quan_ly_ac_quy: req.body.quan_ly_ac_quy, 
                cong_USB: req.body.cong_USB, 
                do_on_hd: req.body.do_on_hd, 
                nhiet_do_hd: req.body.nhiet_do_hd, 
                do_am_hd: req.body.do_am_hd, 
                he_so_cong_suat: req.body.he_so_cong_suat, 
                kich_thuoc: req.body.kich_thuoc, 
                trong_luong: req.body.trong_luong
            }
        );

        if (!info) {
            throw new Error("Details are not correct");
        }

        return res.status(200).send({
            success: true,
        });
    } catch (error) {
        res.status(400).json(error);
        return next(error);
    }
};

module.exports = {
    getInfoProduct,
    updateInfoProduct,
    createInfo
};
