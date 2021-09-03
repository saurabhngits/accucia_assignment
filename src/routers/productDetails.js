const express = require("express");
const router = new express.Router();

require('../db/conn');
const ProductDetails = require("../models/productDetails");
const ProductCategoryMaster = require("../models/productCategoryMaster");

// create a new productCategory using async/await
router.post("/productDetails", chkProductCategoryId, async (req, res) => {
    try{
        const d = new Date();
        req.body.createdAt = d.toISOString();
        req.body.updatedAt = d.toISOString();

        const productDetails = new ProductDetails(req.body);
        const createProductDetails = await productDetails.save();
        res.status(201).send(createProductDetails);
    }
    catch(err){
        res.status(400).send(err);
    }
})

async function chkProductCategoryId(req, res, next){
    try{
        const categoryId = req.body.category_id;
        const productCategoryData = await ProductCategoryMaster.find({category_id:categoryId});

        if(productCategoryData.length <= 0 ){
            res.status(404).send('Category id not matched');
        }
        else{
            next();
        }
    }
    catch(err){
        res.status(400).send(err);
    }
}

module.exports = router;