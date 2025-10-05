const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  firstName : {type:String, required:true},
  lastName : {type:String},
  email : {type:String, required:true, unique:true},
  password : {type:String, required:true},
  userType : {type: String, enum:["host", "guest"], default:"guest"},
});


module.exports = mongoose.model("User", userSchema) // returns class Home that represents homeSchema