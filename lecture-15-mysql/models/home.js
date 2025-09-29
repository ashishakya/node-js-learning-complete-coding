// Core Modules
const fs = require("fs");
// const path = require("path");
// const rootDir = require("../utils/pathUtil");

// const homeDataPath = path.join(rootDir, "data", "homes.json");
const db = require("./../utils/database");

module.exports = class Home {
  constructor(houseName, price, location, rating, photoUrl, description, id) {
    this.houseName = houseName;
    this.price = price;
    this.location = location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    if(this.id){
      return db.execute("UPDATE homes SET houseName=?, price=?, location=?, rating=?, photoUrl=?, description=? WHERE id=?", [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description, this.id])
    }
    return db.execute("INSERT INTO homes (houseName, price, location, rating, photoUrl, description) values (?,?,?,?,?,?)", [this.houseName, this.price, this.location, this.rating, this.photoUrl, this.description])
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
    return db.execute("SELECT * from homes");
    // fs.readFile(homeDataPath, (err, data) => {
    //   callback(!err ? JSON.parse(data) : []);
    // });
  }

  static findById(homeId) {
    return db.execute("SELECT * FROM homes WHERE id=?", [homeId]);

    // this.fetchAll(homeList => {
    //   const home = homeList.find(home=>home.id == homeId)
    //   callback(home);
    // });
  }

  static deleteById(homeId){
    return db.execute("DELETE FROM homes WHERE id=?", [homeId]);

    this.fetchAll(homeList => {
      const homes = homeList.filter(home=>home.id != homeId)
      fs.writeFile(homeDataPath, JSON.stringify(homes), callback);
    });
  }
};
