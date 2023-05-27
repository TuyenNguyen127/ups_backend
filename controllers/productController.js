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
                K: 'Capacity',
                L: 'Technology',
                M: 'isolationTransformer',
                N: 'ACInputVoltage',
                O: 'VoltageRange',
                P: 'FrequencyRange',
                Q: 'powerFactorIN',
                R: 'OutputACVoltage',
                S: 'ACVoltageRegulator',
                T: 'SynFrequencyRange',
                U: 'BatteryFrequencyRange',
                V: 'timeACtobattery',
                W: 'timeInterverBypass',
                X: 'wave',
                Y: 'powerFactorOUT',
                Z: 'battery',
                AA: 'numberOfBattery',
                AB: 'ChargingCurrent',
                AC: 'ChargingVoltage',
                AD: 'ACMode',
                AE: 'batteryModeEfficiency',
                AF: 'LCDScreen',
                AG: 'batteryWaring',
                AH: 'lowBattery',
                AI: 'overLoad',
                AJ: 'error',
                AK: 'ProductDimensions',
                AL: 'mass',
                AM: 'NoiseLevel',
                AN: 'ActiveHumidity',
                AO: 'USB',
                AP: 'phaseNumber',
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
                B: 'Capacity',
                C: 'Technology',
                D: 'isolationTransformer',
                E: 'ACInputVoltage',
                F: 'VoltageRange',
                G: 'FrequencyRange',
                H: 'powerFactorIN',
                I: 'OutputACVoltage',
                J: 'ACVoltageRegulator',
                K: 'SynFrequencyRange',
                L: 'BatteryFrequencyRange',
                M: 'timeACtobattery',
                N: 'timeInterverBypass',
                O: 'wave',
                P: 'powerFactorOUT',
                Q: 'battery',
                R: 'numberOfBattery',
                S: 'ChargingCurrent',
                T: 'ChargingVoltage',
                U: 'ACMode',
                V: 'batteryModeEfficiency',
                W: 'LCDScreen',
                X: 'batteryWaring',
                Y: 'lowBattery',
                Z: 'overLoad',
                AA: 'ChargingCurrent',
                AB: 'ProductDimensions',
                AC: 'mass',
                AD: 'NoiseLevel',
                AE: 'ActiveHumidity',
                AF: 'USB',
                AG: 'phaseNumber',
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

        const {Capacity, Technology, isolationTransformer, ACInputVoltage, VoltageRange, FrequencyRange, powerFactorIN, 
            OutputACVoltage, ACVoltageRegulator, SynFrequencyRange, BatteryFrequencyRange, timeACtobattery, timeInterverBypass,
            wave, powerFactorOUT, battery, numberOfBattery, ChargingCurrent, ChargingVoltage, ACMode, batteryModeEfficiency, 
            LCDScreen, batteryWaring, lowBattery, overLoad, error, ProductDimensions, mass, NoiseLevel, ActiveHumidity, USB, phaseNumber
        } = value;

        const category_ = await Category.findOne({where: {name: category}});
        if (category_) category= category_.id;
        else category=undefined;

        const firm_ = await Firm.findOne({where: {name: firm}});
        if (firm_) firm= firm_.id;
        else firm=undefined;

        const product = await Product.create({
            name, description, price, category, firm, code, origin, guarantee, wattage, feature , url: '/san-pham-' + slug, status: true
        })

        await Info.create({
            productID: product.id,
            Capacity, Technology, isolationTransformer, ACInputVoltage, VoltageRange, FrequencyRange, powerFactorIN, 
            OutputACVoltage, ACVoltageRegulator, SynFrequencyRange, BatteryFrequencyRange, timeACtobattery, timeInterverBypass,
            wave, powerFactorOUT, battery, numberOfBattery, ChargingCurrent, ChargingVoltage, ACMode, batteryModeEfficiency, 
            LCDScreen, batteryWaring, lowBattery, overLoad, error, ProductDimensions, mass, NoiseLevel, ActiveHumidity, USB, phaseNumber
        })
    })
    
    excelData.Info.map(async (value) => {
        const {name, Capacity, Technology, isolationTransformer, ACInputVoltage, VoltageRange, FrequencyRange, powerFactorIN, 
            OutputACVoltage, ACVoltageRegulator, SynFrequencyRange, BatteryFrequencyRange, timeACtobattery, timeInterverBypass,
            wave, powerFactorOUT, battery, numberOfBattery, ChargingCurrent, ChargingVoltage, ACMode, batteryModeEfficiency, 
            LCDScreen, batteryWaring, lowBattery, overLoad, error, ProductDimensions, mass, NoiseLevel, ActiveHumidity, USB, phaseNumber
        } = value;

        const product = await Product.findOne({where: {name: name}});

        if (product) {
            console.log(1);
            await Info.destroy({where: {productID: product.id}});
            await Info.create({
                productID: product.id,
                Capacity, Technology, isolationTransformer, ACInputVoltage, VoltageRange, FrequencyRange, powerFactorIN, 
                OutputACVoltage, ACVoltageRegulator, SynFrequencyRange, BatteryFrequencyRange, timeACtobattery, timeInterverBypass,
                wave, powerFactorOUT, battery, numberOfBattery, ChargingCurrent, ChargingVoltage, ACMode, batteryModeEfficiency, 
                LCDScreen, batteryWaring, lowBattery, overLoad, error, ProductDimensions, mass, NoiseLevel, ActiveHumidity, USB, phaseNumber
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

module.exports = {
    importExcelData2MongoDB,
    getAllproduct,
    updateProduct,
    deleteProduct,
    getProductbyID,
};
