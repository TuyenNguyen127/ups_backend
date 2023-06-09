const { Category, Product, Firm } = require("../models");

function convertToTree(categories, parentId) {
    const result = [];
    
    // Lặp qua danh sách các đối tượng
    for (const category of categories) {
        if (category.parent === parentId) {
            // Tạo một đối tượng mới
            const node = {
                id: category.id,
                name: category.name,
                children: convertToTree(categories, category.name.toString())
            };
    
            // Thêm đối tượng vào kết quả
            result.push(node);
        }
    }
  
    return result;
}

// Hàm tìm kiếm và xây dựng cây dữ liệu
const getCategoryTree = async (name) => {
    const category = await Category.findOne({where: {name: name}});
    const result = {
        name: category?.name,
        parent: category.parent ? await getCategoryTree(category?.parent) : {}
    };

    console.log(result);
    return result;
}

// @route  [POST] /api/category/create
const createCategory = async (req, res, next) => {
    try {
        const p = await Category.findOne({where: {name:req.body.name} });

        if (p || req.body.name === '') {
            // throw new Error("Details are not correct");
            return res.status(401).send({
                success: false,
                message: 'Category name is exist or is null',
            });
        }
        
        const category = await Category.create({
            parent: req.body.parent,
            name: req.body.name,
            description: req.body.description,
            Characteristic: req.body.Characteristic,
            benefit: req.body.benefit,
        });

        if (!category) {
            throw new Error("Details are not correct");
        }

        return res.status(200).send({
            success: true,
            data: category,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

// @route  [PATCH] /api/category/:id
const updateCategory = async (req, res, next) => {
    try {
        const update = await Category.update(
            {
                name: req.body.name,
                description: req.body.description,
                Characteristic: req.body.Characteristic,
                benefit: req.body.benefit,
                parent: req.body.parent,
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
                message: `update category failed for categoryId - ${req.params.id}`,
            });
        }

        return res.status(200).send({
            success: true,
        });

    } catch (error) {
        return next(error);
    }
};

// [DELETE]
const deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!category) {
            throw new Error("Details are not correct");
        }

        return res.status(200).send({
            success: true,
        });

    } catch (error) {
        next(error);
    }
};

//    [GET] /api/category/getAllCategory
const getAllCategory = async (req, res, next) => {
    try {
        const categories = await Category.findAll();
        const tree = convertToTree(categories, '');
        categories.map(async category => {
            if (category.parent) {
                const category_ = await Category.findOne({where: {id: category.parent}})
            }

        })
        res.status(200).json({
            success: true,
            data: categories,
            tree: tree
        });
    } catch (error) {
        next(error);
    }
};

const getCategory = async (req, res) => {
    try {
        const category = await Category.findOne({where: { id: req.params.id }})

        if (!category) {
            return res.status(401).json({
                success: false,
                message: 'Unknown category ?',
            })
        }

        const tree = await getCategoryTree(category.name);
        const products = await Product.findAll({where: {category: req.params.id}});
        if (products.length < 1) {
            console.log(category);
            const categories = await Category.findAll({where: { parent: category.name }})
            return res.status(200).json({ 
                success: true, 
                data: categories, 
                categoryDelta: category, 
                tree: tree 
            })
        }

        const formattedProducts = await Promise.all(products.map(async (product) => {
            const formattedProduct = product.toJSON();
            if (formattedProduct.category) {
                const category = await Category.findOne({ where: { id: formattedProduct.category } });
                formattedProduct.category = category.name;
            }
            if (formattedProduct.firm) {
                const firm = await Firm.findOne({ where: { id: formattedProduct.firm } });
                formattedProduct.firm = firm.name;
            }
            return formattedProduct;
        }));

        return res.status(200).json({ 
            success: true, 
            data: formattedProducts, 
            categoryDelta: category, 
            tree: tree 
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error,
        })
    }
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory,
    getCategory
};
