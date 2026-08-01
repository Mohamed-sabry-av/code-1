const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/test-NTI")
        console.log("Database is Connected");
    } catch (err) {
        console.log("Database Err", err.message);
    }
}

module.exports = connectDB