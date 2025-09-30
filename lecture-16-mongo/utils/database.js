const mongo = require("mongodb")

const MongoClient = mongo.MongoClient;

const MONGO_URL = "mongodb+srv://root:mypassword@ashishakyalearning.pmg8uee.mongodb.net/?retryWrites=true&w=majority&appName=ashishakyaLearning"

let _db;
const mongoConnect = (callback)=>{
    MongoClient.connect(MONGO_URL).then(client=>{
        callback();
        _db = client.db("aitbnb")
    }).catch(err=>{
        console.error("Error while connecting to mongo", err);
    })
}

const getDB = ()=>{
    if(!_db){
       throw new Error("mongo not connected");
    }
    return _db;
}
exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
// MongoClient.connect(MONGO_URL).then(client=>{
//     console.log(client)
//     return client;
// }).catch(err=>{
//     console.error("Error while connecting to mongo", err);
// })
// const mysql = require("mysql2");
//
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'secret',
//     database: 'airbnb'  // create this manually or via code
// });
//
// module.exports = pool.promise()
