const { request, response } = require('express');
const Product = require('../models/product');

const createProduct = async(req = request, res = response) => {
    try {
        const regExpCode = /^[0-9]{13}$/,
            regExpName = /^[a-zA-Z\s\S]{5,40}$/ ;
        const { productCode, productName, stock } = req.body;
        if(!regExpCode.test(productCode.toString())) {
            return res.status(400).json({msg: 'product code invalid' })
        }
        const codeExist = await Product.findOne({where: {productCode}});
        if(codeExist) {
            return res.status(400).json({ msg: 'code already exists' });
        }
        if(!regExpName.test(productName)) {
            return res.status(400).json({ msg: 'product name invalid' })
        }
        if(typeof stock !== 'number' || stock <= 0 || stock >= 1000) {
            return res.status(400).json({ msg: 'stock invalid' })
        }
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.json({ ok: true, msg: 'product created correctly' });
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

module.exports = {
    createProduct,
    getProducts,
    enableProduct,
    disableProduct
};