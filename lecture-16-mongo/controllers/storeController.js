const Home = require("../models/home");
const Favourite = require("../models/favourite")

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes)=>{
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
    Home.fetchAll().then((registeredHomes)=>{
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
    Favourite.getFavourites().then(favourites=>{
        favouriteIds = favourites.map(fav=>fav.houseId);
        Home.fetchAll().then(registeredHomes =>
            {
                const favouriteHomes = registeredHomes.filter(registeredHome=>favouriteIds.includes(String(registeredHome._id)))

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
    const fav = new Favourite(req.body.id)
    fav.save().then(result=>{
        console.log("add fav>>", result)
    }).catch(error=>{
        if(error){
            console.log("Error while marking favourite", error);
        }
    }).finally(()=>{
        res.redirect("/favourites");
    })
}

exports.deleteFavouriteHome = (req, res, next)=>{
    const favouriteHomeId = req.params.favouriteId;
    console.log("fav>>", favouriteHomeId)

    Favourite.deleteById(favouriteHomeId).then(()=>{
        console.log("deleted fac")
    }).catch(error=>{
        if(error){
            console.log("error while deleting favourite host home", error)
        }
    }).finally(()=>{
        res.redirect("/favourites");
    });
}
