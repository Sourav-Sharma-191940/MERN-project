const mongoose = require('mongoose')

// this is used to access the key value pair stored in process.env
const DB = process.env.DATABASE;

// here then is a promise which if fulfill then it will run otherwise catch will run
mongoose.connect(DB)
.then(() => {
    console.log("Database connected")
}).catch((err) => {
    console.log(err)
})