const { Account } = require("../models");

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await Account.findOne({
            where: {
                username,
            },
        });

        if (!user) {
            return res.status(200).json("Account does not exist!");
        }

        if (password == user.password) {
            return res.status(200).json("Login success!");
        } else {
            return res.status(200).json("Incorrect password!");
        }
    } catch (error) {
        res.status(400).json(error);
        next(error);
    }
};

module.exports = {
    login,
};
