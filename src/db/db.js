const mongoose = require('mongoose');

function connectDB(connectionString){
    return mongoose.connect(connectionString,{serverSelectionTimeoutMS:5000})
}
module.exports = connectDB;