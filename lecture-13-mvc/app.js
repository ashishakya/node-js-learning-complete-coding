// core module
const path = require("path");

// external module
const express = require("express");

// local module
const userRouter = require("./routes/user");
const {hostRouter} = require("./routes/host");
const routeDir = require("./utils/pathUtils");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({extended: true}));
app.use(userRouter);
app.use("/host",hostRouter);

app.use(express.static(path.join(routeDir, "public")))

const errorController = require ("./controllers/errors")

app.use(errorController.pageNotFound)

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})

