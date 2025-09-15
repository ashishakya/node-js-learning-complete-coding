// const registeredHomes = [];
const Home = require("../models/home");

exports.getAddHome = (req, res, next)=>{
    res.render("host/addHome", {
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

    res.render("host/homeAdded", {
        pageTitle:"Home Added",
        currentPage:"home-added",
    });
}

exports.getHostHomes = (req, res, next)=>{
     Home.fetchAll((registeredHomes)=>{
        res.render("host/host-home-list", {
            registeredHomes,
            pageTitle: "AirBnb Host Home",
            currentPage:"host-homes",
        })
    })
}
