const { Category, Product } = require("../models");

function convertToTree(categories, parentId) {
    const result = [];
    
    // Lặp qua danh sách các đối tượng
    for (const category of categories) {
        if (category.parent === parentId) {
            // Tạo một đối tượng mới
            const node = {
                id: category.id,
                name: category.name,
                children: convertToTree(categories, category.id.toString())
            };
    
            // Thêm đối tượng vào kết quả
            result.push(node);
        }
    }
  
    return result;
}

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

// @route  [POST] /api/category/create
const createCategory = async (req, res, next) => {
    try {
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
                parent: req.body.parent
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

        const tree = await getCategoryTree(req.params.id);
        const products = await Product.findAll({where: {category: req.params.id}});

        return res.status(200).json({ success: true, data: products, categoryDelta: category, tree: tree })

    } catch (error) {
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
