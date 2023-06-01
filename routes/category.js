const express = require("express");
const { categoryController } = require("../controllers");
const router = express.Router();

router.route("/getAllCategory").get(categoryController.getAllCategory);
router.route("/create").post(categoryController.createCategory);
router
  .route("/:id")
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory)
  .get(categoryController.getCategory);

module.exports = router;
