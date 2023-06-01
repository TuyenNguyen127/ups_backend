const { Firm, Product } = require("../models");

// @route  [POST] /api/firm/create
const createFirm = async (req, res, next) => {
    try {
        const p = await Firm.findOne({where: {name:req.body.name} });

        if (p) {
            // throw new Error("Details are not correct");
            return res.status(401).send({
                success: false,
                message: 'Firm name is exist',
            });
        }

        const firm = await Firm.create({
            name: req.body.name,
            description: req.body.description
        });

        if (!firm) {
            throw new Error("Details are not correct");
        }

        return res.status(200).send({
            success: true,
            data: firm,
        });

    } catch (error) {
        console.log(error);
        return next(error);
    }
};

// @route  [PATCH] /api/firm/:id
const updateFirm = async (req, res, next) => {
    try {
        const update = await Firm.update(
            {
                name: req.body.name,
                description: req.body.description,
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
                message: `update firm failed for firmId - ${req.params.id}`,
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
const deleteFirm = async (req, res, next) => {
    try {
        const firm = await Firm.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!firm) {
            throw new Error("Details are not correct");
        }

        return res.status(200).send({
            success: true,
        });

    } catch (error) {
        next(error);
    }
};

//    [GET] /api/firm/getAllFirm
const getAllFirm = async (req, res, next) => {
    try {
        const firms = await Firm.findAll();
        res.status(200).json({
            success: true,
            data: firms,
        });
    } catch (error) {
        next(error);
    }
};

const getFirm = async (req, res) => {
    try {
        const firm = await Firm.findOne({where: { id: req.params.id }});
        const products = await Product.findAll({where: {firm: req.params.id}});
        if (!firm) {
            return res.status(401).json({
                success: false,
                message: 'Unknown Firm ?',
            })
        }

        return res.status(200).json({ success: true, data: products, firm: firm })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
}

module.exports = {
    createFirm,
    updateFirm,
    deleteFirm,
    getAllFirm,
    getFirm
};
