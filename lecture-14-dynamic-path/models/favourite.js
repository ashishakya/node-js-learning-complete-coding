// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathUtil");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourite(homeId, callback){
    this.getFavourites((favourites) => {
      if(favourites.includes(homeId)){
        console.log("home is already a favourite")
      }else{
        favourites.push(homeId)
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), (error) => {
          console.log("File Writing Concluded", error);
        });
      }
    });
  }

  static getFavourites(callback){
    fs.readFile(favouriteDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }
}