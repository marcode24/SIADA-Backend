const { Router } = require('express');
const { createProduct, getProducts, enableProduct }  = require('../controllers/product');
const router = Router();

router.get('/', getProducts);

router.post('/newProduct', createProduct);
router.post('/enableProduct/:idProduct', enableProduct)

module.exports = router;