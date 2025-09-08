const express = require("express");
const hostRouter = express.Router();
hostRouter.get("/host/add-home", (req, res, next)=>{
  res.send(`<h1>Register your home</h1>
      <form action="/host/add-home" method="POST">
          <input type="text" name="name" placeholder="Enter your home name">
          <button type="submit">Add Home</button>
      </form>
      `)
})

hostRouter.post("/host/add-home", (req, res, next)=>{
  console.log(req.body);
  res.send(`<h1>Successfully added home</h1>
      <a href="/host/add-home">Go to Home</a>
      `)
})

module.exports = hostRouter;