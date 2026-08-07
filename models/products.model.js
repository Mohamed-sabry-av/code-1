const mongoose = require("mongoose")

// define the Sechima 
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    desc: String,
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number 
    },
    imageURL: {
        type: String  // "uploads/image1/jpg"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Product", productSchema)