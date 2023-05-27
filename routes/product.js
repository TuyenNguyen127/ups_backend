const express = require("express");
const { productController } = require("../controllers");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post(
  "/uploadfile",
  upload.single("file"),
  productController.importExcelData2MongoDB
);

router.get("/getAllProduct", productController.getAllproduct);

router
  .route("/:id")
  .get(productController.getProductbyID)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
