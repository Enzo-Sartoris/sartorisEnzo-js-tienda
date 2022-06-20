const { Router } = require('express');

const usersRouter = require('./user.routes');
const productsRouter = require('./product.routes');
const categoriesRouter = require('./category.routes');

const router = Router();

router.use('/users', usersRouter);
router.use('/products', productsRouter);
router.use('/categories', categoriesRouter);

module.exports = router;
