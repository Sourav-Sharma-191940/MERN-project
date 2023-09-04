const express = require('express')
const router = express.Router();
require('../DataBase/conn')
const User = require('../Model/userSchema.js')

router.get('/', (req, res)=>{
    res.send(`Greetings from the server`)
})

// register user using promises - .then. .catch
// router.post('/register', (req, res)=>{
//     const {name, email, phone, work, password, cpassword} = req.body;
//     if(!name|| !email|| !phone|| !work|| !password|| !cpassword){
//         return res.status(422).json({error: "First fill all the fields."})
//     }
//     //check if regestering user data is already available or not.
//     //we are using promises to store data and promises require .then and .catch
//     User.findOne({email: email}).then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({error: "Email already exist"});
//         }
//         // else enter data of new user in db
//         const user = new User({name, email, phone, work, password, cpassword})
//         user.save().then(()=>{
//             res.status(200).json({message: "Account Created Successfully"});
//         }).catch((err)=>{
//             res.status(500).json({error: "Failed to create an account"});
//         })
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// register user using async await -try, catch
router.post('/register', async(req, res)=>{
    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name|| !email|| !phone|| !work|| !password|| !cpassword){
        return res.status(422).json({error: "First fill all the fields."})
    }
    try{
        const response = await User.findOne({email: email});
            if(response){
                return res.status(422).json({error: "Email already exist"});
            }
            //else enter data of new user in db
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save();
            res.status(200).json({message: "Account Created Successfully"});
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;