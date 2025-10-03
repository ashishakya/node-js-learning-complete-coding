// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")

const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", (req, res,  next)=>{
  if(req.isLoggedIn){
    next()
  }else{
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);
app.use(authRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3001;

mongoose.connect("mongodb+srv://root:mypassword@ashishakyalearning.pmg8uee.mongodb.net/airbnb?retryWrites=true&w=majority&appName=ashishakyaLearning")
        .then(()=>{
  console.log("mongoose connected");
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err=>console.error("error while connecting mongoose", err))
// mongoConnect(client=>{
//   app.listen(PORT, () => {
//     console.log(`Server running on address http://localhost:${PORT}`);
//   });
// })
