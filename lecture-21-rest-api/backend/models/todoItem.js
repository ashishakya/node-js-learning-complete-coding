const mongoose = require("mongoose")
// const Favourite = require("./favourite")

const todoItemSchema = mongoose.Schema({
  task : {type:String, required:true},
  date : {type:Date, required:true},
  completed : {type:Boolean, required:false, default:false},
}, {timestamps:true});

module.exports = mongoose.model("TodoItem", todoItemSchema) // returns class Home that represents homeSchema