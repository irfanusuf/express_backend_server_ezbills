const mongoose = require('mongoose')


const User = mongoose.model("User" , {


 username : String,
 email :  {type : String , require :true , unique :true},
 password : String,


})

module.exports = User

