const fs = require("fs");

fs.writeFile("output.txt", "Hello World from fs", (err) => {
  if (err) {
    console.log("error occured");
  } else {
    console.log("File written successfully");
  }
});
