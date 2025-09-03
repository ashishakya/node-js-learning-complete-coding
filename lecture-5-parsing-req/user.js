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
            console.log(parsedBody);
            const params = new URLSearchParams(parsedBody);
            const jsonObject = {}
            for (const [key, value] of params.entries()){
                jsonObject[key] = value
            }
            const jsonString = JSON.stringify(jsonObject);
            console.log(jsonString);
            fs.writeFileSync("user.txt", jsonString)
            // console.log(jsonObject);
        })
        // fs.writeFileSync("user.txt", "ashishakya")
        res.statusCode = 302;
        res.setHeader("Location", "/");
        // res.write("<h1>Form Successfully Submitted</h1>");
        // return res.end();
    }
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Else Page</title></head>");
    res.write("<body><h1>404 Not Found</h1></body>");
    res.write("</html>");
    res.end();
}

module.exports = requestHandler;
