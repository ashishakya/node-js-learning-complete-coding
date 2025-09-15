const http = require("http");

const server = http.createServer((req, res)=>{
    if(req.url === "/"){
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>My Home Page</title></head>");
        res.write("<body><h1>WELCOME TO MY CALCULATOR</h1>");
        res.write("<h3><a href='/calculator'>Use Calculator</a></h3>");
        res.write("</body>");
        res.write("</html>");
        res.end();
    }
    else if(req.url === "/calculator"){
        res.setHeader("Content-Type", "text/html");
        res.write("<html>");
        res.write("<head><title>My Home Page</title></head>");
        res.write("<body><h1>MY CALCULATOR</h1>");
        res.write("<h3>USE SUM FUNCTION</h3>");
        res.write("</hr>");
        res.write("<form action='/result' method='POST'><label for='num1'>First Number</label><input type='text' id='num1' name='num1'><label for='num2'>Second Number</label><input type='text' id='num2' name='num2'><button type='submit'>Submit</button></form>");
        res.write("</body>");
        res.write("</html>");
        res.end();
    }else if(req.url === "/result"){
        let body = [];
        let sum;
        req.on("data", chunk=>{
            body.push(chunk)
        })
        req.on("end",()=>{
            const parsedBody = Buffer.concat(body).toString();
            const params = new URLSearchParams(parsedBody);
            const bodyObject = Object.fromEntries(params);
            const num1 = Number(bodyObject.num1)
            const num2 = Number(bodyObject.num2);
             sum = num1 + num2;
            console.log(sum);
        })
        res.setHeader("Content-Type", "text/html");
        res.write(`
            <html lang="html">
                <head><title>My Home Page</title></head>
                <body><h1>MY CALCULATOR</h1>
                <h3>THE SUM IS: ${sum}</h3>
                </body>
                </html>
            </html>
            `);
        res.end();
    }
});

const PORT = 3000;

server.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})

