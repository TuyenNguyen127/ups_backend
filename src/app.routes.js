const express = require('express');

const app = express();
const path = require("path");
app.use(express.static(path.resolve(__dirname,'public')));

const router = express.Router()
const verifyToken = require('../src/middleware/auth')

// Auth
const authController = require('./controller/auth')
router.post('/login', authController.loginUser)
router.post('/register', authController.registerUser)
router.post('/forget-password', authController.forgetPassword)

router.post('/change-password', authController.changePassword)
router.post('/otp', authController.checkOtpEmail)
router.post('/reset-password', authController.resetPassword)

// ==================
const main = require('./controller/main');
const uploadFile = require('./middleware/upload');

router.get('/products', main.getAllProduct);
router.get('/categories', main.getAllCategory);
router.get('/firms', main.getAllFirm);

router.get('/product/:id', main.getProduct);
router.get('/category/:id', main.getCategory);
router.get('/firm/:id', main.getFirm);

router.post('/create-product', main.createProduct);
router.post('/create-category', main.createCategory);
router.post('/create-firm', main.createFirm);

router.put('/edit-category/:id', main.editCategory);
router.put('/edit-firm/:id', main.editFirm);
router.put('/edit-product/:id', main.editProduct);

router.delete('/delete-category/:id', main.deleteCategory);
router.delete('/delete-firm/:id', main.deleteFirm);
router.delete('/delete-product/:id', main.deleteProduct);

router.post("/uploadfile", uploadFile.single("file"), main.importExcelData2MongoDB);

module.exports = router
