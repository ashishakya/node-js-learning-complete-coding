const path = require("path");
const express = require("express");

const routeDir = require("../utils/pathUtils");

const contactUsRouter = express.Router();

contactUsRouter.get("/contact-us", (req, res, next)=>{
  res.sendFile(path.join(routeDir, "views/contactUs.html"));
})

contactUsRouter.post("/contact-us", (req, res, next)=>{
  console.log(req.body);
  res.sendFile(path.join(routeDir, "views/contactAdded.html"));
})

module.exports = contactUsRouter;