const Home = require("../models/home");
const Favourite = require("../models/favourite")

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes, fields])=>{
      res.render("store/home-list", {
          registeredHomes: registeredHomes,
          pageTitle: "Homes List",
          currentPage: "Home",
      })
  }).catch(error=>{
      console.log("Error while reading homes", error)
  })
};

exports.getHomes = (req, res, next) => {
    Home.fetchAll().then(([registeredHomes, fields])=>{
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
    Favourite.getFavourites(favouriteIds=>{
        Home.fetchAll().then(([registeredHomes]) =>
            {
                const favouriteHomes = registeredHomes.filter(registeredHome=>favouriteIds.includes(String(registeredHome.id)))

                res.render("store/favourite-list", {
                    registeredHomes: favouriteHomes,
                    pageTitle: "My Favourites",
                    currentPage: "favourites",
                })
            }
        );
    });

};

exports.getHomeDetail = (req, res, next) => {
    const homeId = req.params.homeId
    // console.log("home id is::", homeId);
     Home.findById(homeId).then(([homes])=>{
         const home = homes[0]
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
    Favourite.addToFavourite(req.body.id, error=>{
        if(error){
            console.log("Error while marking error");
        }
    })
    res.redirect("/favourites");
}

exports.deleteFavouriteHome = (req, res, next)=>{
    const favouriteHomeId = req.params.favouriteId;
    console.log("fav>>", favouriteHomeId)

    Favourite.deleteById(favouriteHomeId, error=>{
        if(error){
            console.log("error while deleting favourite host home", error)
        }
    });

    res.redirect("/favourites")
}
