// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const mongoose = require("mongoose");
const rootDir = require("./utils/pathUtil");

const todoItemRouter = require("./routes/todoItemRouter")
const errorsController = require("./controllers/errors")

const app = express();

const MONGO_DB_URL =  "mongodb+srv://root:mypassword@ashishakyalearning.pmg8uee.mongodb.net/todo?retryWrites=true&w=majority&appName=ashishakyaLearning";

app.use(express.urlencoded());
app.use(express.static(path.join(rootDir, 'public')))

app.use("/api/todo", todoItemRouter)
app.use(errorsController.pageNotFound);

const PORT = 3001;

mongoose.connect(MONGO_DB_URL)
        .then(()=>{
          console.log("mongoose connected");
          app.listen(PORT, () => {
            console.log(`Server running on address http://localhost:${PORT}`);
          });
        }).catch(err=>console.error("error while connecting mongoose", err))
