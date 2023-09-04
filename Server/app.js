const express = require("express")
const dotenv = require("dotenv")
const app = express();
// dotenv is use to secure our credencials exposing to others
dotenv.config({path:'./config.env'});
//importing database connection
require('./DataBase/conn.js')
// const User = require('./Model/userSchema.js')
// use to modify json data into objets so that it is readable to the app
app.use(express.json());
//router file import, app.use require a middleware function.
app.use(require('./router/Auth'));
// Middleware- It is used to check the user authentication and display correct data according to user or check if user is login or not
// req- request, res-response, next- what to do after checking the authentication
const middleware = (req, res, next) => {
    console.log(`Middleware is initiated`)

}
middleware();
// importing port from process.env
const port = process.env.PORT

app.get('/', (req, res) => {
    res.send(`Greetings from the server`)
})
// If we want to show about page only after authentication then we will use middleware function here
app.get('/about', middleware, (req, res) => {
    res.send(`You are on about page of the server`)
})
app.get('/contact', (req, res) => {
    res.send(`You are on Contact page of the server`)
})
app.get('/signin', (req, res) => {
    res.send(`You are on login page of the server`)
})
app.get('/signup', (req, res) => {
    res.send(`You are on signup page of the server`)
})
// this listen method is use to tell the server that on which port to show the message from app.get
app.listen(port, () => {
    console.log(`Server is running at Port:${port}`)
})