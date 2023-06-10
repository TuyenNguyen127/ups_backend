const authRouter = require("./auth");
const accountRouter = require("./account");
const productRouter = require("./product");
const categoryRouter = require("./category");
const infoRouter = require("./info");
const firmRouter = require("./firm");
const fs = require('fs');
const { uploadImg } = require("../middlewares/upload");

const route = (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api/account", accountRouter);
    app.use("/api/firm", firmRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/product", productRouter);
    app.use("/api/info", infoRouter);
    app.post("/api/uploadImg", uploadImg, (req,res) => {
        const link = 'http://localhost:8080/uploads/' + req.file.filename;
        try {
            return res.status(200).json({links: link})
        } catch(e) {
            return res.status(400).json(e);
        }
    });
    app.post("/api/deleteImg", (req, res) => {
        const link = req.body.link;
        console.log(link);
        try {
            fs.unlink(link, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
            return res.status(200).json({success: true});
        } catch(e) {
            return res.status(400).json({success: false});
        }
    })
};

module.exports = route;
