const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true, 
        })
        console.log("MongoDB connected!");
    } catch (err) {
        console.error("MongoDB connected error!", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
