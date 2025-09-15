const http = require("http");

const server = http.createServer((req, res)=> {
  console.log(req);
  process.exit(); //server will not run, stops listening loops
})

const PORT = 3000;

server.listen(PORT, ()=>{
  console.log(`Server is running at http://localhost:${PORT}`);
});