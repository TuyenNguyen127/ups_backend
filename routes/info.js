const express = require("express");
const { infoController } = require("../controllers");
const router = express.Router();

router
    .route("/:id")
    .get(infoController.getInfoProduct)
    .put(infoController.updateInfoProduct)
    .post(infoController.createInfo);

module.exports = router;
