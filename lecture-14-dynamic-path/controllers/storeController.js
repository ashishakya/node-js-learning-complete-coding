const Home = require("../models/home");
const Favourite = require("../models/favourite")

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  })
};

exports.getFavouriteList = (req, res, next) => {
    Favourite.getFavourites(favouriteIds=>{
        Home.fetchAll((registeredHomes) =>
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
     Home.findById(homeId, home=>{
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
