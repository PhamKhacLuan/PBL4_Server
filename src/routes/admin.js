const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/productController');
const orderController = require('../app/controllers/orderController');
const statisticalController = require('../app/controllers/statisticalController');

//Product
router.put('/product/:id', productController.update);
router.post('/product/stored', productController.stored);
router.get('/product/show', productController.show);
router.get('/product/:id/edit', productController.edit);
router.delete('/product/:id/force', productController.forceDelete);
router.get('/product/search',productController.search);
router.get('/product/img',productController.getImg); 

//Order
router.get('/order/show/:id', orderController.getOrderById)
router.get('/order/show', orderController.show)
router.post('/order/stored', orderController.stored)
router.delete('/order/:id/force', orderController.forceDelete);
router.get('/order/search',orderController.search); 

//Statistical
router.get('/statistical/show/', statisticalController.show)
module.exports = router;
