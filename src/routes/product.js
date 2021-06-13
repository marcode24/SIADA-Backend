const { Router } = require('express');
const { createProduct, getProducts }  = require('../controllers/product');
const router = Router();

router.get('/', getProducts);
router.post('/newProduct', createProduct);

module.exports = router;