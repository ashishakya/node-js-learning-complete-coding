const path = require("path");

const express = require("express");

const userRouter = require("./routes/user");
const hostRouter = require("./routes/host");

const routeDir = require("./utils/pathUtils");

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(userRouter);
app.use("/host",hostRouter);

app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(routeDir, "views/404.ejs"));
    // res.status(404).send("<h1>404 Not Found!!</h1>");
})

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})

