const mongoose = require('mongoose');

let URI;
if (process.env.NODE_ENV === 'production') {
    URI = process.env.MONGO_URI;
} else {
    URI = require('./config').MONGO_URI;
}

const connectDB = async () => {
    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        console.log("MongoDB Connected...");
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;