const express = require("express");
const { firmController } = require("../controllers");
const router = express.Router();

router.route("/getAllFirm").get(firmController.getAllFirm);
router.route("/create").post(firmController.createFirm);
router
  .route("/:id")
  .patch(firmController.updateFirm)
  .delete(firmController.deleteFirm)
  .get(firmController.getFirm);

module.exports = router;
