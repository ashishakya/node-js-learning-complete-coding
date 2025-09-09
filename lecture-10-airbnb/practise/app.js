const express = require("express");
const path = require("path");
const app = express();

const routeDir = require("./utils/pathUtils");

const contactUsRouter = require("./routes/contactUs");

app.get("/",(req, res, next)=>{
    res.send(`<h1>Hello from express</h1>
        <a href="/contact-us">Contact Us</a>
        `)

})

app.use(express.urlencoded({extended: true}));
app.use(contactUsRouter);

app.use((req, res, next)=>{
    res.status(404).sendFile(path.join(routeDir, "views/404.html"));
})

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})

