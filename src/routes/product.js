const express = require('express');
const router = express.Router();

const ProductController = require('../app/controllers/productController');

router.get('/create', ProductController.create);
router.post('/stored', ProductController.stored);
router.get('/show', ProductController.show);
router.get('/:id/edit', ProductController.edit);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);
router.delete('/:id/force', ProductController.forceDelete);
router.patch('/:id/restore', ProductController.restore);   
module.exports = router;
