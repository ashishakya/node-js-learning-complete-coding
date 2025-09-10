const express = require("express");
const path = require("path");

const routeDir = require("../utils/pathUtils");
const {registeredHomes} = require("./host")

const userRouter = express.Router();

userRouter.get("/", (req, res, next)=>{
  console.log(registeredHomes)
  // res.sendFile(path.join(routeDir, "views/home.ejs"));
  res.render("home", {
    registeredHomes,
    pageTitle: "AirBnb Home"
  })
})

module.exports = userRouter;