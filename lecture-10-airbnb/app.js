const express = require("express");

// const hostRouter = require("./routes/host")
const userRouter = require("./routes/user");
const hostRouter = require("./routes/host");

const app = express();

app.use((req, res, next)=>{
    console.log(req.url, req.method);
    next();
})

app.use(express.urlencoded({extended: true}));
app.use(userRouter);
app.use(hostRouter);

// app.get("/", (req, res, next)=>{
//     res.send(`<h1>Hello from air bnb</h1>
//         <a href="/host/add-home">Add Home</a>
//         `)
// })



// app.use(hostRouter);
// app.use(userRouter);

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})

