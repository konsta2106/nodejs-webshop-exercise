const path = require('path');

const express = require('express');

const rootDir = require('../helpers/path');

const adminController = require('../controllers/admin')

const router = express.Router();



// /admin/add-product => GET
router.get('/add-product', adminController.getAddProductPage);

// /admin/add-product => POST
router.post('/add-product', adminController.addProduct);

router.get('/admin-product', adminController.getAdminProducts);

// router.get('/edit-product/:productId', adminController.getEditProduct)

// router.post('/edit-product', adminController.postEditProduct)

// router.post('/delete', adminController.postDelete)

module.exports = router;

