const express = require("express");
const path = require("path");
const routeDir = require("../utils/pathUtils");

const userRouter = express.Router();

userRouter.get("/", (req, res, next)=>{
  // res.send(`<h1>Hello from air bnb</h1>
  //     <a href="/host/add-home">Add Home</a>
  //     `)
  // res.sendFile(path.join(__dirname, "../views/home.html"));
  res.sendFile(path.join(routeDir, "views/home.html"));
})

module.exports = userRouter;