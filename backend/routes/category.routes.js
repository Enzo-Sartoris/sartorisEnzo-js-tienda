const router = require('express').Router();

const { getCategories } = require('../controllers/categories.controllers');

router.get('/', getCategories);

module.exports = router;