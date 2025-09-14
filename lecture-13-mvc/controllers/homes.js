// const registeredHomes = [];
const Home = require("../models/home");

exports.getAddHome = (req, res, next)=>{
    res.render("addHome", {
        pageTitle:"Add Home",
        currentPage:"add-home",
    });
}

exports.postAddHome = (req, res, next)=>{
    const home = new Home(req.body.name, req.body.rent)
    home.save()
    // registeredHomes.push({
    //     name:req.body.name,
    //     rent:req.body.rent,
    // })

    res.render("homeAdded", {
        pageTitle:"Home Added",
        currentPage:"home-added",
    });
}

exports.getHomes = (req, res, next)=>{
     Home.fetchAll((registeredHomes)=>{
        res.render("home", {
            registeredHomes,
            pageTitle: "AirBnb Home",
            currentPage:"home",
        })
    })
    // res.render("home", {
    //     registeredHomes,
    //     pageTitle: "AirBnb Home",
    //     currentPage:"home",
    // })
}
