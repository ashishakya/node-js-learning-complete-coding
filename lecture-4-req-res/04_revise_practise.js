const http = require("http");

const server = http.createServer((req, res)=>{
  if(req.url === "/"){
    res.write("<body><ul><li><a href='/'> Home</a></li><li><a href='/about'>About</a></li><li><a href='/contact'>Contact</a></li></ul>");
    res.write("<h1>I'm home page</h1>")
    res.end();
  }
  else if(req.url === "/about"){
    res.write("<body><ul><li><a href='/'> Home</a></li><li><a href='/about'>About</a></li><li><a href='/contact'>Contact</a></li></ul>");
    res.write("<h1>I'm about page</h1>")
    res.end();
  }
  else if(req.url === "/contact"){
    res.write("<body><ul><li><a href='/'> Home</a></li><li><a href='/about'>About</a></li><li><a href='/contact'>Contact</a></li></ul>");
    res.write("<h1>I'm contact page</h1>")
    res.end();
  }else{
    res.write("<body><ul><li><a href='/'> Home</a></li><li><a href='/about'>About</a></li><li><a href='/contact'>Contact</a></li></ul>");
    res.write("<h1>404 not found</h1>")
    res.end();
  }
})


const PORT = 3000;

server.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
});
