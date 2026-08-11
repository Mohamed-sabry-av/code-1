const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is Connected");
    } catch (err) {
        console.log("Database Err", err.message);
    }
}

module.exports = connectDB