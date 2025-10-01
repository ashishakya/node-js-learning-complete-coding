const Home = require("../models/home");
const Favourite = require("../models/favourite")

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes)=>{
      res.render("store/home-list", {
          registeredHomes: registeredHomes,
          pageTitle: "Homes List",
          currentPage: "index1",
      })
  }).catch(error=>{
      console.log("Error while reading homes", error)
  })
};

exports.getHomes = (req, res, next) => {
    Home.find().then((registeredHomes)=>{
        res.render("store/home-list", {
            registeredHomes: registeredHomes,
            pageTitle: "Homes List",
            currentPage: "Home",
        })
    }).catch(error=>{
        console.log("Error while reading homes", error)
    })
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
    Favourite.find()
             .populate("houseId")
             .then((favourites) => {
                 console.log("Raw Favourites:", favourites);

                 const favouriteHomes = favourites
                     .filter(fav => fav.houseId) // Prevent nulls from broken references
                     .map(fav => fav.houseId);

                 console.log("Mapped Homes:", favouriteHomes);

                 res.render("store/favourite-list", {
                     registeredHomes: favouriteHomes,
                     pageTitle: "My Favourites",
                     currentPage: "favourites",
                 });
             })
             .catch((err) => {
                 console.error("Error in getFavouriteList:", err);
                 res.status(500).send("Internal Server Error");
             });
};

exports.getHomeDetail = (req, res, next) => {
    const homeId = req.params.homeId
    // console.log("home id is::", homeId);
     Home.findById(homeId).then(home=>{
         if(!home){
             res.redirect("/homes");
         }else{
             res.render("store/home-detail", {
                 pageTitle: "Homes Detail",
                 currentPage: "Home",
                 home
             })
         }
    });
};

exports.postAddToFavourite = (req, res, next)=>{
    const homeId = req.body.id;
    Favourite.findOne({houseId:homeId})
             .then((fav)=>{
                 if(fav){
                     console.log("already marked as favourite");
                     res.redirect("/favourites");
                 }else{
                     const fav = new Favourite({houseId: homeId})
                     return fav.save().then((result)=>{
                         console.log("fav added::", result)
                         res.redirect("/favourites");
                     })
                 }
        }).catch(err=>console.log("error while adding fav", err))
}

exports.deleteFavouriteHome = (req, res, next)=>{
    const favouriteHomeId = req.params.favouriteId;

    Favourite.findOneAndDelete({houseId: favouriteHomeId }).then(()=>{
        console.log("deleted fac")
    }).catch(error=>{
        if(error){
            console.log("error while deleting favourite host home", error)
        }
    }).finally(()=>{
        res.redirect("/favourites");
    });
}
