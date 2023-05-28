const sequelize = require("../config/db");
const { Product, Info, Category, Firm } = require("../models");
var excelToJson = require('convert-excel-to-json');

// Hàm tìm kiếm và xây dựng cây dữ liệu
const getCategoryTree = async (id) => {
    const category = await Category.findOne({where: {id: id}});
    const result = {
        name: category?.name,
        parent: category.parent ? await getCategoryTree(category?.parent) : {}
    };

    console.log(result);
    return result;
}

// [POST]    /api/product/uploadfile
const importExcelData2MongoDB = (req, res) => {
    const filepath = __basedir + '/resources/' + req.file.filename;

    const excelData = excelToJson({
        sourceFile: filepath,
        header: {
            rows: 1
        },
        sheets:[{
            // Excel Sheet Name
            name: 'Products',
            // Header Row -> be skipped and will not be present at our result object.
            header:{
                rows: 1
            },
            // Mapping columns to keys
            columnToKey: {
                A: 'name',
                B: 'code',
                C: 'origin',
                D: 'price',
                E: 'firm',
                F: 'category',
                G: 'guarantee',
                H: 'wattage',
                I: 'description',
                J: 'feature',
                K: 'cong_suat',
                L: 'dai_dien_ap',
                M: 'tan_so_vao',
                N: 'so_pha',
                O: 'dien_ap',
                P: 'dien_ap_che_do_ac_quy',
                Q: 'tan_so_ra',
                R: 'dang_song',
                S: 'thoi_gian_chuyen_mach',
                T: 'loai_ac_quy',
                U: 'thoi_gian_sac',
                V: 'quan_ly_ac_quy',
                W: 'timeInterverBypass',
                X: 'bv_ngan_mach',
                Y: 'bv_xung',
                Z: 'canh_bao',
                AA: 'bv_qua_tai',
                AB: 'cong_USB',
                AC: 'do_on_hd',
                AD: 'nhiet_do_hd',
                AE: 'do_am_hd',
                AF: 'he_so_cong_suat',
                AG: 'kich_thuoc',
                AH: 'trong_luong',
            }
        },{
            // Excel Sheet Name
            name: 'Info',
            // Header Row -> be skipped and will not be present at our result object.
            header:{
                rows: 1
            },
            // Mapping columns to keys
            columnToKey: {
                A: 'name',
                B: 'cong_suat',
                C: 'dai_dien_ap',
                D: 'tan_so_vao',
                E: 'so_pha',
                F: 'dien_ap',
                G: 'dien_ap_che_do_ac_quy',
                H: 'tan_so_ra',
                I: 'dang_song',
                J: 'thoi_gian_chuyen_mach',
                K: 'loai_ac_quy',
                L: 'thoi_gian_sac',
                M: 'bv_ngan_mach',
                N: 'bv_xung',
                O: 'canh_bao',
                P: 'bv_qua_tai',
                Q: 'quan_ly_ac_quy',
                R: 'cong_USB',
                S: 'do_on_hd',
                T: 'nhiet_do_hd',
                U: 'do_am_hd',
                V: 'he_so_cong_suat',
                W: 'kich_thuoc',
                X: 'trong_luong',
            }
        }]
    });
    // -> Log Excel Data to Console
    excelData.Products.map(async (value) => {
        const p_name = await Product.findOne({where: { name: value.name}})
        const p_code = await Product.findOne({where: {code: value.code}})

        if (p_name || p_code) {
            console.log(0);
            return;
        }
        const slug = value.name.toLowerCase().replace(/\s+/g, '-');
        var { name, description, price, category, firm, code, origin, guarantee, wattage, feature } = value;

        const {cong_suat, dai_dien_ap, tan_so_vao, so_pha, dien_ap, dien_ap_che_do_ac_quy, tan_so_ra, 
            dang_song, thoi_gian_chuyen_mach, loai_ac_quy, thoi_gian_sac, bv_ngan_mach, bv_xung,
            canh_bao, bv_qua_tai, quan_ly_ac_quy, cong_USB, do_on_hd, nhiet_do_hd, do_am_hd, he_so_cong_suat, 
            kich_thuoc, trong_luong
        } = value;

        const category_ = await Category.findOne({where: {name: category}});
        if (category_) category= category_.id;
        else category=undefined;

        const firm_ = await Firm.findOne({where: {name: firm}});
        if (firm_) firm= firm_.id;
        else firm=undefined;

        const product = await Product.create({
            name, description, price, category, firm, code, origin, guarantee, wattage, feature , status: true
        })

        await Info.create({
            productID: product.id,
            cong_suat, dai_dien_ap, tan_so_vao, so_pha, dien_ap, dien_ap_che_do_ac_quy, tan_so_ra, 
            dang_song, thoi_gian_chuyen_mach, loai_ac_quy, thoi_gian_sac, bv_ngan_mach, bv_xung,
            canh_bao, bv_qua_tai, quan_ly_ac_quy, cong_USB, do_on_hd, nhiet_do_hd, do_am_hd, he_so_cong_suat, 
            kich_thuoc, trong_luong
        })
    })
    
    excelData.Info.map(async (value) => {
        const {name, cong_suat, dai_dien_ap, tan_so_vao, so_pha, dien_ap, dien_ap_che_do_ac_quy, tan_so_ra, 
            dang_song, thoi_gian_chuyen_mach, loai_ac_quy, thoi_gian_sac, bv_ngan_mach, bv_xung,
            canh_bao, bv_qua_tai, quan_ly_ac_quy, cong_USB, do_on_hd, nhiet_do_hd, do_am_hd, he_so_cong_suat, 
            kich_thuoc, trong_luong
        } = value;

        const product = await Product.findOne({where: {name: name}});

        if (product) {
            console.log(1);
            await Info.destroy({where: {productID: product.id}});
            await Info.create({
                productID: product.id,
                cong_suat, dai_dien_ap, tan_so_vao, so_pha, dien_ap, dien_ap_che_do_ac_quy, tan_so_ra, 
                dang_song, thoi_gian_chuyen_mach, loai_ac_quy, thoi_gian_sac, bv_ngan_mach, bv_xung,
                canh_bao, bv_qua_tai, quan_ly_ac_quy, cong_USB, do_on_hd, nhiet_do_hd, do_am_hd, he_so_cong_suat, 
                kich_thuoc, trong_luong
            })
        }
    })

    return res.status(200).json({success: true, message: "New infos and products have update"})
}

// [GET]    /api/product/getAllProduct
const getAllproduct = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error);
    }
};

// @route [PATCH] /api/product/:id
const updateProduct = async (req, res, next) => {
    try {
        const update = await Product.update(
            {
                productLineId: req.body.productLineId,
                name: req.body.name,
                firm: req.body.firm,
                code: req.body.code,
                status: req.body.status,
                origin: req.body.origin,
                wattage: req.body.wattage,
                guarantee: req.body.guarantee,
                description: req.body.description,
                feature: req.body.feature,
                img: req.body.img
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

        if (!update[0]) {
            return next({
                message: `update product failed for productId - ${req.params.id}`,
            });
        }

        return res.status(200).send({
            success: true,
        });
    } catch (error) {
        return next(error);
    }
};

// @route  [DELETE] /api/product/:id
const deleteProduct = async (req, res, next) => {
    return new Promise(async () => {
        const t = await sequelize.transaction();
        const productID = req.params.id;
        try {
            // Xóa thông tin liên quan từ bảng "Info"
            await Info.destroy({ where: { productID }, transaction: t });

            // Xóa sản phẩm từ bảng "Product"
            await Product.destroy({ where: { id: productID }, transaction: t });

            await t.commit();
            res.status(200).json("Product and related info deleted successfully!");
        } catch (error) {
            await t.rollback();
            next(error);
        }
    });
};

// @route  [GET] /api/product/:id
const getProductbyID = async (req, res, next) => {
    try {
        const product = await Product.findOne({
            where: {
                id: req.params.id,
            },
        });
        const tree = await getCategoryTree(product.category);

        const info = await Info.findOne({where: { productID: product.id }})

        res.status(200).json({ product: product, info: info, tree: tree});
        
    } catch (error) {
        res.status(400).json(error);
    }
};

// @route  [POST] /api/category/create
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create({
            name: req.body.parent,
            category: req.body.category,
            description: req.body.description,
            firm: req.body.firm,
            code: req.body.code,
            status: req.body.status,
            origin: req.body.origin,
            wattage: req.body.wattage,
            guarantee: req.body.guarantee,
            feature: req.body.feature,
           // img: req.body.img
        });

        if (!product) {
            throw new Error("Details are not correct");
        }

        return res.status(200).send({
            success: true,
            data: product,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

module.exports = {
    importExcelData2MongoDB,
    getAllproduct,
    updateProduct,
    deleteProduct,
    getProductbyID,
    createProduct
};
