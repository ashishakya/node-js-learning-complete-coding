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
  // res.sendFile(path.join(routeDir, "views/addHome.ejs"));
  res.render("addHome", {
    pageTitle:"Add Home"
  });
})

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next)=>{
  console.log("home registration successfully for:", req.body.name)
  registeredHomes.push({name:req.body.name})
  // res.sendFile(path.join(__dirname, "../views/homeAdded.ejs"));
  res.render("homeAdded", {
    pageTitle:"Home Added"
  });
})

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes