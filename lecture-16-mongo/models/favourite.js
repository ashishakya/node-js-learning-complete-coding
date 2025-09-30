const { getDB } = require("../utils/database")
const { ObjectId } = require("mongodb")
module.exports = class Favourite {
  constructor(houseId) {
    this.houseId = houseId
  }
   save(homeId, callback){
    const db = getDB();

    return db.collection("favourites").findOne({houseId:this.houseId}).then(existingFav=>{
      if(!existingFav){
        return db.collection("favourites").insertOne(this)
      }
      return Promise.resolve()
    })

  }

  static getFavourites(callback){
    const db = getDB();

    return db.collection("favourites").find().toArray();

  }

  static deleteById(favoriteId){
    const db = getDB();

    return db.collection("favourites")
             .deleteOne({houseId:favoriteId});

  }
}