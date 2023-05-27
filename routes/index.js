const authRouter = require("./auth");
const accountRouter = require("./account");
const productRouter = require("./product");
const categoryRouter = require("./category");
const infoRouter = require("./info");
const firmRouter = require("./firm");

const route = (app) => {
    app.use("/api/auth", authRouter);
    app.use("/api/account", accountRouter);
    app.use("/api/firm", firmRouter);
    app.use("/api/category", categoryRouter);
    app.use("/api/product", productRouter);
    app.use("/api/info", infoRouter);
};

module.exports = route;
