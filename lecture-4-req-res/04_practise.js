const http = require("http");


const server = http.createServer((req, res)=> {
  console.log(req.url, req.method, req.headers);

  if(req.url === "/"){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Home Page</title></head>");
    res.write("<body><ul><li><a href='/'> Home</a></li><li><a href='/about'>About</a></li><li><a href='/contact'>Contact</a></li></ul>");
    res.write("<h1>Welcome to my HomePage</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }else if(req.url === "/about"){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My About Page</title></head>");
    res.write("<body><ul><li><a href='/'> Home</a></li><li><a href='/about'>About</a></li><li><a href='/contact'>Contact</a></li></ul>");
    res.write("<h1>Welcome to my about page</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }else if(req.url === "/contact"){
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My Contact Page</title></head>");
    res.write("<body><ul><li><a href='/'> Home</a></li><li><a href='/about'>About</a></li><li><a href='/contact'>Contact</a></li></ul>");
    res.write("<h1>Welcome to my contact page</h1>");
    res.write("</body>");
    res.end();
  }else{
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My 404 Page</title></head>");
    res.write("<body><h1>404 Not Found</h1></body>");
    res.end();
  }
})

const PORT = 3000;

server.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
});
