const path = require('path');

const express = require('express');

const rootDir = require('../helpers/path');
const adminData = require('./admin');
const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
// router.get('/products/:productId', shopController.getProductDetail);
// router.get('/orders', shopController.getOrders);
// router.post('/cart', shopController.postCart)
// router.get('/cart', shopController.getCart)
// router.post('/cart-delete-item', shopController.postCartDeleteItem)
// router.get('/checkout', shopController.getCheckout);



module.exports = router;
