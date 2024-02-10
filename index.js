const express = require('express')   // importing a libarary
const mongoose = require('mongoose')
const {registerHandler , loginHandler , deleteUser , forgotPassHandler }= require('./controllers/userController')
const bodyParser = require('body-parser')



const port = 3000
const url = 'mongodb://localhost:27017/express-app'


const server = express()

server.use(bodyParser.json())

if(mongoose.connect(url)){
    console.log(`Database connected on ${url}`)
}else {
    console.log("Data base error ")
}



// get routes 

server.get('/' , (req , res)=>{res.send("hello world ")})
server.get('/home' , (req , res)=>{res.send("this is home page  ")})




// post routes 

server.post('/user/register' , registerHandler  )
server.post('/user/login'  , loginHandler)
server.post('/user/delete/me'  , deleteUser)
server.post('/user/forgotPass'  , forgotPassHandler)






server.listen(port , ()=>{console.log(`server started on port ${port}`)})




