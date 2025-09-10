const path = require("path");
const express = require("express");

const routeDir = require("../utils/pathUtils");

const hostRouter = express.Router();

hostRouter.get("/add-home", (req, res, next)=>{
  // res.send(`<h1>Register your home</h1>
  //     <form action="/host/add-home" method="POST">
  //         <input type="text" name="name" placeholder="Enter your home name">
  //         <button type="submit">Add Home</button>
  //     </form>
  //     `)
  // res.sendFile(path.join(__dirname, "../views/addHome.ejs"));
  res.sendFile(path.join(routeDir, "views/addHome.ejs"));
})

hostRouter.post("/add-home", (req, res, next)=>{
  // console.log(req.body);
  // res.send(`<h1>Successfully added home</h1>
  //     <a href="/host/add-home">Go to Home</a>
  //     `)
  res.sendFile(path.join(__dirname, "../views/homeAdded.ejs"));

})

module.exports = hostRouter;