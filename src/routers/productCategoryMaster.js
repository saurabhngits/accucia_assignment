const express = require("express");
const router = new express.Router();
const crypto = require("crypto");

require('../db/conn');
const ProductCategoryMaster = require("../models/productCategoryMaster");

// create a new productCategory using async/await
router.post("/productCategory", async (req, res) => {
    try{
        const d = new Date();
        req.body.createdAt = d.toISOString();
        req.body.updatedAt = d.toISOString();
        req.body.category_id = crypto.randomBytes(16).toString("hex");

        const productCategory = new ProductCategoryMaster(req.body);
        const createProductCategory = await productCategory.save();
        res.status(201).send(createProductCategory);
    }
    catch(err){
        res.status(400).send(err);
    }
})

// fetch all productCategory presend in the collection using async/await
router.get("/productCategory", async (req, res) => {
    try{
        const productCategoryData = await ProductCategoryMaster.find();
        res.send(productCategoryData);
    }
    catch(err){
        res.status(400).send(err);
    }
})

// fetch the productCategory
router.get("/productCategory/latest", async (req, res) => {
    try{
        const productCategoryData = await ProductCategoryMaster.aggregate(
            [
                {
                    $lookup: {
                        from: "productdetails",
                        localField: "category_id",
                        foreignField: "category_id",
                        pipeline: [
                            { $sort: { createdAt: -1 } },
                            { $limit: 3 }
                        ],
                        as: "category_details"
                    }
                }
            ]
        );
        res.send(productCategoryData);
    }
    catch(err){
        res.status(500).send(err);
    }
})

// update the student by it's id 
router.patch("/productCategory/:id", async (req, res) => {
    try{
        const d = new Date();
        req.body.updatedAt = d.toISOString();

        const _id =req.params.id;
        const updateData = await ProductCategoryMaster.findByIdAndUpdate(
            _id, 
            req.body, 
            {
                useFindAndModify: false,
                new: true
            }
        ); 
    
        res.send(updateData);
    }
    catch(err){
        res.status(500).send(err);
    }
})

// delete the student by it's id 
router.delete("/productCategory/:id", async (req, res) => {
    try{
        const _id = req.params.id;
        const deleteData = await ProductCategoryMaster.findByIdAndDelete(_id); 
        
        if(!_id){
            res.status(404).send();
        }
        else if(!deleteData){
            res.status(404).send('Category is not exists');
        }
        else{
            res.send(deleteData);
        }
    }
    catch(err){
        res.status(500).send(err);
    }
})

module.exports = router;