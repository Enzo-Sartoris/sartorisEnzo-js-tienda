const router = require('express').Router();

const { createProduct, getProducts, deleteProduct, getProductById, updateProduct } = require('../controllers/products.controllers');

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.put('/:id', updateProduct);

module.exports = router;