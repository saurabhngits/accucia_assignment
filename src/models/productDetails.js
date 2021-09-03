const mongoose = require("mongoose");

// We will create a new schema
const productDetailsSchema = new mongoose.Schema({
    product_name: {
        type: String, 
        required: true,
        minlength: 3,
        unique: [true, "Product is already present"]
    },
    price: {
        type: Number, 
        required: true
    },
    quantity: {
        type: Number, 
        required: true
    },
    category_id: {
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
const productDetails = new mongoose.model('productDetails', productDetailsSchema);

module.exports = productDetails;