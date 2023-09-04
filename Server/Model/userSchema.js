// userSchema is used to define the datatype of the data which we are storing in the database
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    work: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    cpassword: {
        type: String,
        require: true
    }
})
// Creating a collection in mongodb with name "User" 
const User = mongoose.model('USER', userSchema);

module.exports = User;