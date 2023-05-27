const { Account } = require("../models");
const sequelize = require("../config/db");

const readXlsxFile = require("read-excel-file/node");

const createAccount = async (req, res, next) => {
    try {
        const account = await Account.create({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
        });

        if (!account) {
            throw new Error("Details are not correct");
        }

        return res.status(200).send({
            success: true,
            data: account,
        });
    } catch (error) {
        console.log(error);
        return next(error);
    }
};

const editAccount = async (req, res, next) => {
    try {
        const { username, password } = req.body;
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAccount,
    editAccount,
};
