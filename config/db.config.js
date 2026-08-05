const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://mohamedsabryav_db_user:AZ9lCWVfC1iwtdPB@cluster0.uhzk0nz.mongodb.net/?appName=Cluster0")
        console.log("Database is Connected");
    } catch (err) {
        console.log("Database Err", err.message);
    }
}

module.exports = connectDB