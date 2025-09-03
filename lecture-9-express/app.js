// external module
// const http = require("http");

const requestHandler = require("./user")
// external module
const express = require("express");

const app = express();

app.use((req, res, next)=>{
    console.log("first middleware>>", req.url)
    next()
})
app.use((req, res, next)=>{
    console.log("second middleware>>", req.url)
    res.send("<p>Welcome to express js</p>")
})

// const server = http.createServer(app);

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})

