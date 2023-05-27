const express = require("express");
const { infoController } = require("../controllers");
const router = express.Router();

router
    .route("/:id")
    .get(infoController.getInfoProduct)
    .patch(infoController.updateInfoProduct);

module.exports = router;
