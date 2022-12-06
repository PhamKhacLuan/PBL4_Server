const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/adminController');

router.get('/product/create', adminController.create);
router.post('/product/stored', adminController.stored);
router.get('/product/show', adminController.show);
router.get('/product/:id/edit', adminController.edit);
router.put('/product/:id', adminController.update);
router.delete('/product/:id', adminController.delete);
router.delete('/product/:id/force', adminController.forceDelete);
router.patch('/product/:id/restore', adminController.restore);   
module.exports = router;
