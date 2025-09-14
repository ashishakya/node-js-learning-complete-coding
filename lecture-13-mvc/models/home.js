const fs = require("fs");
const path = require("path")
const rootDir = require("../utils/pathUtils")

let registeredHomes = []

module.exports = class Home {
   constructor(houseName, rent) {
       this.name = houseName
       this.rent = rent
   }

   save(){
       Home.fetchAll(registeredHomes =>{
           registeredHomes.push(this)
           const filePath = path.join(rootDir, "data/homes.json")
           fs.writeFile(filePath, JSON.stringify(registeredHomes), (err)=>{
               console.log(err);
           })
       })
   }

   static fetchAll(callback){
       const filePath = path.join(rootDir, "data/homes.json")
       const fileContent =fs.readFile(filePath, (err, data)=>{
          if(err){
              // registeredHomes =  []
              callback([]);
          }
           // registeredHomes =  JSON.parse(data);
           callback(JSON.parse(data));
       });
       // callback(registeredHomes);
   }
}