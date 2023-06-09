const express = require("express");
const { productController } = require("../controllers");
const router = express.Router();
const upload = require("../middlewares/upload");

router.post(
  "/uploadfile",
  upload.uploadFile,
  productController.importExcelData2MongoDB
);

router.post("/create", productController.createProduct);

router.get("/getAllProduct", productController.getAllproduct);

router
  .route("/:id")
  .get(productController.getProductbyID)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
