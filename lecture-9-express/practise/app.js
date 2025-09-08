const express = require("express");

const app = express();

app.get("/contact-us", (req, res, next)=>{
    res.send(`
    <h3> Contact Us</h3>
    <form action="contact-us" method="POST">
        <input type="text" name="name"/>
        <button type="submit">Submit</button>
    </form> 
    `)
    // next()
})

app.post("/contact-us", (req, res, next)=>{
    res.send(`
    <h3> Thank you for contacting use</h3>
    `)
})

app.use("/", (req, res, next)=>{
    console.log("first middleware>>", req.url)
    // res.send("<p>Welcome to first middleware</p>")
    next()
})

app.use("/", (req, res, next)=>{
    console.log("second middleware>>", req.url, req.method)
    next()
})
app.use("/", (req, res, next)=>{
    console.log("came from third middleware>>", req.url)
    res.send("<p>Welcome to third middleware</p>")
    next()
})





const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})

