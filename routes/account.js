const express = require("express");
const { accountController } = require("../controllers");
const router = express.Router();

router.post("/create", accountController.createAccount);

module.exports = router;
