const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router();
require('../DataBase/conn')
const User = require('../Model/userSchema.js')

router.get('/', (req, res) => {
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
router.post('/register', async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "First fill all the fields." })
    }
    try {
        const response = await User.findOne({ email: email });
        if (response) {
            return res.status(422).json({ error: "Email already exist" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Password and Confirm password are different" });
        }
        else {
            //else enter data of new user in db
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(200).json({ message: "Account Created Successfully" });
        }

    }
    catch (err) {
        console.log(err);
    }
})

// login user authentication
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Fill all details." })
    }
    try {
        const userLogin = await User.findOne({ email: email });
        // here userLogin will return all the data of that particular user
        if (!userLogin) {
            return res.json({ error: "Invalid Credentials" })
        }
        else{
            const passVerify = await bcrypt.compare(password, userLogin.password)
            if (passVerify) {
                return res.json({ message: "User login successfully" })
            }
            else {
                 res.json({ error: "Invalid Credentials" })
            }
        }
        
    }
    catch (err) {
        console.log(err)
    }

})

module.exports = router;