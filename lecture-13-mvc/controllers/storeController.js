// const registeredHomes = [];
const Home = require("../models/home");

exports.getIndex = (req, res, next)=>{
    Home.fetchAll((registeredHomes)=>{
        res.render("store/index", {
            registeredHomes,
            pageTitle: "AirBnb Home",
            currentPage:"index",
        })
    })
}

exports.getHomes = (req, res, next)=>{
     Home.fetchAll((registeredHomes)=>{
        res.render("store/home-list", {
            registeredHomes,
            pageTitle: "Homes List",
            currentPage:"home",
        })
    })
}

exports.getBookings = (req, res, next)=>{
        res.render("store/bookings", {
            pageTitle: "My Bookings",
            currentPage:"bookings",
        })
}

exports.getFavouriteList = (req, res, next)=>{
    res.render("store/favourite-home-list", {
        pageTitle: "My Favourites",
        currentPage:"favourites",
    })
}