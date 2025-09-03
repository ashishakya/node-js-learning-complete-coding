const http = require("http");

const server = http.createServer((req, res)=> {
  console.log(req.url, req.method, req.headers);

  if(req.url === "/"){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Home Page</title></head>");
    res.write("<body><h1>Welcome to home page</h1></body>");
    res.write("</html>");
    res.end();
  }else if(req.url === "/products"){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My product Page</title></head>");
    res.write("<body><h1>Welcome to product page</h1></body>");
    res.write("</html>");
    res.end();
  }else{
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Else Page</title></head>");
    res.write("<body><h1>404 Not Found</h1></body>");
    res.write("</html>");
    res.end();
  }
})

const PORT = 3000;

server.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
});