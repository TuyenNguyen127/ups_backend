const  Product  = require('../model/Product');
const  Category  = require('../model/Category');
const  Firm  = require('../model/Firm');
var excelToJson = require('convert-excel-to-json');
const Info = require('../model/Info');

function convertToTree(categories, parentId = null) {
    const result = [];
  
    // Lặp qua danh sách các đối tượng
    for (const category of categories) {
        if (category.parent && category.parent.toString() === parentId) {
            // Tạo một đối tượng mới
            const node = {
                href: category.url || '/',
                name: category.name,
                children: convertToTree(categories, category._id.toString())
            };
    
            // Thêm đối tượng vào kết quả
            result.push(node);
        }
    }
  
    return result;
}

// Hàm tìm kiếm và xây dựng cây dữ liệu
const getCategoryTree = async (id) => {
    const category = await Category.findOne({_id: id});
    const result = {
        name: category?.name,
        parent: category.parent ? await getCategoryTree(category?.parent) : {}
    };

    console.log(result);
    return result;
}

exports.getAllProduct = async (req, res) => {
    const products =  await Product.find({}).lean();
    return res.status(200).json({ success: true, data: products })
}

exports.getProduct = async (req, res) => {
    const {id: product_id  } = req.params
    try {
        const product = await Product.findOne({ _id: product_id })
            .populate({
                path: 'category',
                select: '_id name url',
            })
            .populate({
                path: 'firm',
                select: '_id name url',
            })
            .lean()
        const info = await Info.findOne({productID: product_id});

        if (!product) {
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy sản phẩm ',
            })
        }

        return res.status(200).json({ success: true, data: product , info: info})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.editProduct = async (req, res) => {
    const {title, description, price, images, category, firm, code, status, origin, guarantee, wattage, feature ,id: _id} = req.body;
    try {
        const product = await Product.findOne({ _id: _id })
        const productSame = await Product.findOne({ title: title })
        if (product && !productSame) {
            await Product.updateOne({_id}, {title, description, price, images, category, firm, code, status, origin, guarantee, wattage, feature});
            return res.status(200).json({ success: true, message: "Cập nhật thông tin sản phẩm thành công" })
        }

        if (!product) return res.status(200).json({ success: true, message: "Sản phẩm không tồn tại" })
        return res.status(200).json({ success: true, message: "Tên sản phẩm đã tồn tại" })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.deleteProduct = async (req, res) => {
    const {id: _id } = req.params;
    try {
        const product = await Product.findOneAndDelete({_id: _id});

        if (product) {
            return res.status(200).json({ success: true, message: "Xóa sản phẩm thành công" })
        }
        
        return res.status(200).json({ success: true, message: "Sản phẩm không tồn tại" })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.createProduct = async (req, res) => {
    const {title, description, price, images, category, firm, code, status, origin, guarantee, wattage, feature} = req.body;
    try {
        const p_title = await Product.findOne({title: title})
        const p_code = await Product.findOne({code: code})
        if (p_title || p_code) return res.status(200).json({ success: true, message: "Tạo sản phẩm thất bại! Sản phẫm đã tồn tại" })
        const slug = title.toLowerCase().replace(/\s+/g, '-');

        await Product.create({
            title, description, price, images, category, firm, code, status, origin, guarantee, wattage, feature , url: '/san-pham-' + slug
        })

        return res.status(200).json({ success: true, message: "Tạo sản phẩm mới thành công" })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.getCategory = async (req, res) => {
    const { id: category_id } = req.params
    try {
        const category = await Category.findOne({ _id: category_id })
            .populate({
                path: 'parent',
                select: '_id name url',
            })
            .lean()

        if (!category) {
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy danh mục ',
            })
        }

        const categoryTree = await getCategoryTree(category_id);
        const products = await Product.find({category: category_id}).lean();

        return res.status(200).json({ success: true, data: products, category: category, categoryTree: categoryTree })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.createCategory = async (req, res) => {
    const { name , parent , description } = req.body;
    console.log(req.body);

    try {
        const category = await Category.findOne( {name: name} );
        const slug = name.toLowerCase().replace(/\s+/g, '-');

        if (parent) {
            const parentC = await Category.findOne( {_id: parent} );
            if (!category && parentC) {
                new Category({
                    name: name,
                    parent: parent,
                    description: description,
                    url: '/danh-muc-' + slug
                }).save()
    
                return res.status(200).json({ success: true, message: "Tạo danh mục mới thành công" })
            }
            if (category) return res.status(200).json({ success: true, message: "Tạo danh mục thất bại! Danh mục đã tồn tại" })
            if (!parentC) return res.status(200).json({ success: true, message: "Tạo danh mục thất bại! Danh mục cha không tồn tại" })
        }
        
        if (!category) {
            new Category({
                name: name,
                parent: undefined,
                description: description,
                url: '/' + slug
            }).save()

            return res.status(200).json({ success: true, message: "Tạo danh mục mới thành công" })
        }

        return res.status(200).json({ success: true, message: "Tạo danh mục thất bại! Danh mục đã tồn tại" })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.deleteCategory = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const category = await Category.findOneAndDelete({_id: _id})
        
        if (category) {
            await Category.updateMany({parent: _id}, {$set: {parent: ''}});
            await Product.updateMany({category: _id}, {$set: {category: ''}});
            return res.status(200).json({ success: true, message: "Xóa danh mục thành công" })
        }
        
        return res.status(200).json({ success: true, message: "Danh mục không tồn tại" })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.editCategory = async (req, res) => {
    const {name , parent ,id: _id, description } = req.body;

    try {
        const category = await Category.findOne( {name: name} )

        if (category) {
            const categoryDoc = await Category.updateOne({_id},{
                name,
                parent: parent || '',
                description
            });
    
            if (categoryDoc) return res.status(200).json({ success: true, message: "Cập nhật danh mục thành công" })
            return res.status(200).json({ success: true, message: "Danh mục không tồn tại" })
        }
        return res.status(200).json({ success: true, message: "Tên danh mục đã tồn tại" })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find({ parent: '' }).lean();
        const tree = convertToTree(categories);

        return res.status(200).json({ success: true, data: tree })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.getFirm = async (req, res) => {
    const { id: firm_id } = req.params
    try {
        const firm = await Firm.findOne({ _id: firm_id });
        const products = await Product.find({firm: firm_id}).lean();
        if (!firm) {
            return res.status(401).json({
                success: false,
                message: 'Không tìm thấy danh mục ',
            })
        }

        return res.status(200).json({ success: true, data: products, firm: firm })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.getAllFirm = async (req, res) => {
    const categories =  await Firm.find({}).lean();
    return res.status(200).json({ success: true, data: categories })
}

exports.editFirm = async (req, res) => {
    const {name , description ,id: _id} = req.body;
    try {
        const firm_ = await Firm.findOne( {name: name} )
        if (!firm_) {
            const firm = await Firm.updateOne({_id},{
                name,
                description
            });

            if (firm) return res.status(200).json({ success: true, message: "Cập nhật hãng sản phẩm thành công" })
            return res.status(200).json({ success: true, message: "Hãng sản phẩm không tồn tại" })
        } 
        return res.status(200).json({ success: true, message: "Tên hãng sản phẩm đã tồn tại" })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.deleteFirm = async (req, res) => {
    const { id: _id } = req.params;
    try {
        const firm = await Firm.findOneAndDelete({_id: _id})
        
        if (firm) {
            await Product.updateMany({firm: _id}, {$set: {firm: ''}});
            return res.status(200).json({ success: true, message: "Xóa hãng sản phẩm thành công" })
        }
        
        return res.status(200).json({ success: true, message: "Hãng sản phẩm không tồn tại" })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.createFirm = async (req, res) => {
    const { name , description } = req.body;

    try {
        const firm = await Firm.findOne( {name: name} )
        const slug = name.toLowerCase().replace(/\s+/g, '-');
        if (!firm) {
            new Firm({
                name: name,
                description: description,
                url: '/hang-' + slug
            }).save()
            return res.status(200).json({ success: true, message: "Tạo hãng sản phẩm mới thành công" })
        }
        return res.status(200).json({ success: true, message: "Tạo hãng sản phẩm! Hãng sản phẩm đã tồn tại" })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Lỗi bên trong ',
            error,
        })
    }
}

exports.importExcelData2MongoDB = (req, res) => {
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
                A: 'title',
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
                A: 'title',
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
        const p_title = await Product.findOne({title: value.title})
        const p_code = await Product.findOne({code: value.code})

        if (p_title || p_code) return;

        const slug = value.title.toLowerCase().replace(/\s+/g, '-');
        var { title, description, price, category, firm, code, origin, guarantee, wattage, feature } = value;

        const {Capacity, Technology, isolationTransformer, ACInputVoltage, VoltageRange, FrequencyRange, powerFactorIN, 
            OutputACVoltage, ACVoltageRegulator, SynFrequencyRange, BatteryFrequencyRange, timeACtobattery, timeInterverBypass,
            wave, powerFactorOUT, battery, numberOfBattery, ChargingCurrent, ChargingVoltage, ACMode, batteryModeEfficiency, 
            LCDScreen, batteryWaring, lowBattery, overLoad, error, ProductDimensions, mass, NoiseLevel, ActiveHumidity, USB, phaseNumber
        } = value;

        const category_ = await Category.findOne({name: category});
        if (category_) category= category_._id;
        else category=undefined;

        const firm_ = await Firm.findOne({name: firm});
        if (firm_) firm= firm_._id;
        else firm=undefined;

        const product = await Product.create({
            title, description, price, category, firm, code, origin, guarantee, wattage, feature , url: '/san-pham-' + slug
        })

        await Info.create({
            productID: product._id,
            Capacity, Technology, isolationTransformer, ACInputVoltage, VoltageRange, FrequencyRange, powerFactorIN, 
            OutputACVoltage, ACVoltageRegulator, SynFrequencyRange, BatteryFrequencyRange, timeACtobattery, timeInterverBypass,
            wave, powerFactorOUT, battery, numberOfBattery, ChargingCurrent, ChargingVoltage, ACMode, batteryModeEfficiency, 
            LCDScreen, batteryWaring, lowBattery, overLoad, error, ProductDimensions, mass, NoiseLevel, ActiveHumidity, USB, phaseNumber
        })

        
    })
    
    excelData.Info.map(async (value) => {
        const {title, Capacity, Technology, isolationTransformer, ACInputVoltage, VoltageRange, FrequencyRange, powerFactorIN, 
            OutputACVoltage, ACVoltageRegulator, SynFrequencyRange, BatteryFrequencyRange, timeACtobattery, timeInterverBypass,
            wave, powerFactorOUT, battery, numberOfBattery, ChargingCurrent, ChargingVoltage, ACMode, batteryModeEfficiency, 
            LCDScreen, batteryWaring, lowBattery, overLoad, error, ProductDimensions, mass, NoiseLevel, ActiveHumidity, USB, phaseNumber
        } = value;

        const product = await Product.findOne({title: title});

        if (product) {
            await Info.findOneAndDelete({title: title});
            await Info.create({
                productID: product._id,
                Capacity, Technology, isolationTransformer, ACInputVoltage, VoltageRange, FrequencyRange, powerFactorIN, 
                OutputACVoltage, ACVoltageRegulator, SynFrequencyRange, BatteryFrequencyRange, timeACtobattery, timeInterverBypass,
                wave, powerFactorOUT, battery, numberOfBattery, ChargingCurrent, ChargingVoltage, ACMode, batteryModeEfficiency, 
                LCDScreen, batteryWaring, lowBattery, overLoad, error, ProductDimensions, mass, NoiseLevel, ActiveHumidity, USB, phaseNumber
            })
        }
    })
    
    return res.status(200).json({success: false, message: "Có sản phẩm đã tồn tại"})
}