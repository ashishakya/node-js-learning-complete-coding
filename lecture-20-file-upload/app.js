// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const multer = require("multer");

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")

const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const mongoose = require("mongoose");

const app = express();

const MONGO_DB_URL =  "mongodb+srv://root:mypassword@ashishakyalearning.pmg8uee.mongodb.net/airbnb?retryWrites=true&w=majority&appName=ashishakyaLearning";


app.set('view engine', 'ejs');
app.set('views', 'views');


const storage =multer.diskStorage({
    destination: (req, file, cb) =>{
        // cb(null, path.join(rootDir, "public", "images"))
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
})
const multerOptions={
  storage
}
app.use(express.urlencoded());
app.use(multer(multerOptions).single("photo"))
app.use(express.static(path.join(rootDir, 'public')))

const store = new MongoDBStore({
  uri:MONGO_DB_URL,
  collection: "sessions"
})

app.use(session({
  secret:"learning node js stack",
  resave:false,
  saveUninitialized: true,
  store
}))

app.use((req, res, next)=>{
  // req.isLoggedIn = req.get("Cookie") ?req.get("Cookie").split("=")[1] ==="true" : false ;
  req.isLoggedIn = req.session.isLoggedIn || false ;
  next()
})
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

mongoose.connect(MONGO_DB_URL)
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
