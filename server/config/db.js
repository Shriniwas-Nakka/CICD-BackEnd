/*
* @description: establishing connection to mongodb
*/
const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true }, (err) => {
    if (err) {
        console.log('MongoDB connection failed !', err);
    } else {
        console.log('MongoDB connection established successfully.');
    }
}); 