const mongoose = require("mongoose");

// We will create a new schema
const prodCategoryMasterSchema = new mongoose.Schema({
    category_name: {
        type: String, 
        required: true,
        minlength: 3,
        unique: [true, "Product Category is already present"]
    },
    category_id: {
        type: String, 
        required: true,
        unique: [true, "Category Id is already present"]
    },
    status: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date
    }
})

// We will create a new collection
const prodCategoryMaster = new mongoose.model('ProdCategoryMaster', prodCategoryMasterSchema);

module.exports = prodCategoryMaster;