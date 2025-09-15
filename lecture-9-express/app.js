
// external module
const express = require("express");

const app = express();

app.get("/", (req, res, next)=>{
    console.log("first middleware>>", req.url)
    // res.send("<p>Welcome to first middleware</p>")
    next()
})

app.post("/submit", (req, res, next)=>{
    console.log("second middleware>>", req.url, req.method)
    res.send("<p>Welcome to express js</p>")
})
app.use("/", (req, res, next)=>{
    console.log("came from another middleware>>", req.url)
    res.send("<p>Welcome to another middleware</p>")
    // next()
})



// const server = http.createServer(app);

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})

