const { request, response } = require('express');
const Product = require('../models/product');
const { validateProductCode, validateProductName } = require('../helpers/validate-fields');

const createProduct = async(req = request, res = response) => {
    try {
        const { productCode, productName, stock } = req.body;
        if(!validateProductCode(productCode)) {
            return res.status(400).json({msg: 'product code invalid' })
        }
        const codeExist = await Product.findOne({where: {productCode}});
        if(codeExist) {
            return res.status(400).json({ msg: 'code already exists' });
        }
        if(!validateProductName(productName)) {
            return res.status(400).json({ msg: 'product name invalid' })
        }
        if(typeof stock !== 'number' || stock <= 0 || stock >= 1000) {
            return res.status(400).json({ msg: 'stock invalid' })
        }
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json({ msg: 'product created correctly' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'something went wrong' });
    }
}

const getProducts = async(req = request, res = response) => {
    try {
        const productsDB = await Product.findAll();
        res.json({ productsDB });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'something went wrong' });
    }
}

const enableProduct = async(req = request, res = response) => {
    try {
        const { idProduct } = req.params;
        const productDB = await Product.findOne({where: {productCode: Number(idProduct)}})
        if(!productDB) {
            return res.status(404).json({ msg: 'product not found' });
        }
        if(productDB.enabled) {
            return res.json({ msg: 'product has already been enabled' });
        }
        await productDB.update({enabled: true});
        res.json({msg: 'product enabled correclty'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'something went wrong' });
    }
}

const disableProduct = async(req = request, res = response) => {
    try {
        const { idProduct } = req.params;
        const productDB = await Product.findOne({where: {productCode: Number(idProduct)}})
        if(!productDB) {
            return res.status(404).json({ msg: 'product not found' });
        }
        if(!productDB.enabled) {
            return res.json({ msg: 'product has already been disabled' });
        }
        await productDB.update({enabled: false});
        res.json({msg: 'product disabled correclty'});
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'something went wrong' });
    }
}

const editProduct = async(req = request, res = response) => {
    try {
        const { productCode, productName, stock } = req.body;
        if(!validateProductCode(productCode)) {
            return res.status(400).json({msg: 'product code invalid' })
        }
        const codeExist = await Product.findOne({where: {productCode}});
        if(codeExist.productCode !== productCode) {
            if(codeExist) {
                return res.status(400).json({ msg: 'code already exists' });
            }
            if(!validateProductName(productName)) {
                return res.status(400).json({ msg: 'product name invalid' })
            }
            if(typeof stock !== 'number' || stock <= 0 || stock >= 1000) {
                return res.status(400).json({ msg: 'stock invalid' })
            }
        }
        const { idProduct } = req.params;
        const productDB = await Product.findOne({where: {productCode: Number(idProduct)}})
        await productDB.update(req.body);
        res.json({ msg: 'product edited correctly' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'something went wrong' });
    }
}

const setPriceProduct = async(req = request, res = response) => {
    try {
        const { idProduct } = req.params;
        const { price } = req.body;
        const regExpPrice = /^(([0-9][0-9]{0,2})([.][0-9][1-9]{0,1})?|1000|1000.00)$/;
        const productDB = await Product.findOne({where: {productCode: Number(idProduct)}})
        if(!productDB) {
            return res.status(404).json({ msg: 'product not found' });
        }
        await productDB.update({ price });
        res.json({ msg: 'price product set correctly' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'something went wrong' });
    }
}

module.exports = {
    createProduct,
    getProducts,
    enableProduct,
    disableProduct,
    editProduct,
    setPriceProduct
};