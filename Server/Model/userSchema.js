// userSchema is used to define the datatype of the data which we are storing in the database
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs'); //used to incrept password to hash
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

//hashing password
// here "save" is a method in auth.js before which we are hashing password before saving to db
userSchema.pre('save', async function(next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

// Creating a collection in mongodb with name "User" 
const User = mongoose.model('USER', userSchema);
module.exports = User;