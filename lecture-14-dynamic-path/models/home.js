// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const homeDataPath = path.join(rootDir, "data", "homes.json");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if(this.id){ // edit
        registeredHomes = registeredHomes.map(registeredHome=>{
          if(registeredHome.id == this.id){
            return this;
          }
          return registeredHome
        })
      }else{ // add new one
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    this.fetchAll(homeList => {
      const home = homeList.find(home=>home.id == homeId)
      callback(home);
    });
  }

  static deleteById(homeId, callback){
    this.fetchAll(homeList => {
      const homes = homeList.filter(home=>home.id != homeId)
      fs.writeFile(homeDataPath, JSON.stringify(homes), callback);
    });
  }
};
