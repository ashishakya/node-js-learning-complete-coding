const fs = require("fs");

const requestHandler = (req, res)=> {
    if(req.url === "/"){
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>My Home Page</title></head>");
        res.write("<body><h1>Enter your details</h1>");
        res.write("<form action='/submit' method='POST'><label for='username'>Username</label><input type='text' id='username' name='username'><button type='submit'>Submit</button></form>");
        res.write("</body>");
        res.write("</html>");
        return res.end();
    }else if(req.url.toLocaleLowerCase() === "/submit" && req.method === "POST"){
        let body = [];
        req.on("data", chunk=>{
            console.log(chunk)
            body.push(chunk)
        })
        req.on("end",()=>{
            const parsedBody = Buffer.concat(body).toString();
            const params = new URLSearchParams(parsedBody);
            const bodyObject = Object.fromEntries(params);
            console.log("1. write starts")
            // const dataSync = fs.writeFileSync("user.txt", JSON.stringify(bodyObject)) // this blocks due to synchronose process
            // console.log("2. write end");
            // following is the async process::::
            fs.writeFile("user.txt", JSON.stringify(bodyObject), error=>{
                res.statusCode = 302;
                res.setHeader("Location", "/");
                return res.end();
            })
            console.log("2. write end");
        })
        console.log("3. Process ends");
        // return res.end();
    }else{
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>My Else Page</title></head>");
        res.write("<body><h1>404 Not Found</h1></body>");
        res.write("</html>");
        res.end();
    }
}

module.exports = requestHandler;
