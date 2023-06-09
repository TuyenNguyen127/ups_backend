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
            console.log(req.body);
            return res.status(400).json({message: "Account does not exist!", success: false});
        }

        if (password == user.password) {
            return res.status(200).json({message: "Login success!", success: true});
        } else {
            return res.status(400).json({message: "Incorrect password!", success:false});
        }
    } catch (error) {
        res.status(400).json(error);
        next(error);
    }
};

module.exports = {
    login,
};
