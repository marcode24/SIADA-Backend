const { Router } = require('express');
const { createProduct, getProducts, enableProduct, disableProduct, editProduct }  = require('../controllers/product');
const router = Router();

router.get('/', getProducts);

router.post('/newProduct', createProduct);
router.post('/enableProduct/:idProduct', enableProduct);
router.post('/disableProduct/:idProduct', disableProduct);
router.post('/editProduct/:idProduct', editProduct);

module.exports = router;