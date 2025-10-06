const Home = require("../models/home");
const User = require("../models/user");
// const Favourite = require("../models/favourite")

exports.getIndex = (req, res, next) => {
    // console.log(">>>>>>>>>>>>>>", req.session, req.session.isLoggedIn)
  Home.find().then((registeredHomes)=>{
      res.render("store/home-list", {
          registeredHomes: registeredHomes,
          pageTitle: "Homes List",
          currentPage: "index1",
          isLoggedIn: req.isLoggedIn,
          user: req.session.user,
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
            isLoggedIn: req.isLoggedIn,
            user: req.session.user,
        })
    }).catch(error=>{
        console.log("Error while reading homes", error)
    })
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
  })
};

exports.getFavouriteList = async (req, res, next) => {
    const userId = req.session.user._id;
    const user = await User.findById(userId).populate("favourites")
     res.render("store/favourite-list", {
         registeredHomes: user.favourites,
         pageTitle: "My Favourites",
         currentPage: "favourites",
         isLoggedIn: req.isLoggedIn,
         user: req.session.user,
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
                 home,
                 isLoggedIn: req.isLoggedIn,
                 user: req.session.user,
             })
         }
    });
};

exports.postAddToFavourite = async (req, res, next)=>{
    // res.send("add to favourite");
    const homeId = req.body.id;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    if(!user.favourites.includes(homeId)){
        user.favourites.push(homeId);
        await user.save();
    }
    res.redirect("/favourites");
    // Favourite.findOne({houseId:homeId})
    //          .then((fav)=>{
    //              if(fav){
    //                  console.log("already marked as favourite");
    //                  res.redirect("/favourites");
    //              }else{
    //                  const fav = new Favourite({houseId: homeId})
    //                  return fav.save().then((result)=>{
    //                      console.log("fav added::", result)
    //                      res.redirect("/favourites");
    //                  })
    //              }
    //     }).catch(err=>console.log("error while adding fav", err))
}

exports.deleteFavouriteHome = async (req, res, next)=>{
    // res.send("delete fav");
    const homeId = req.params.favouriteId;
    const userId = req.session.user._id;
    const user = await User.findById(userId);
    console.log("to deleteee>>>>>>", homeId);

    if(user.favourites.includes(homeId)){
        console.log("im included in fav>>>>>>", homeId);
        user.favourites = user.favourites.filter(fav=>fav!=homeId)
        await user.save();
    }

    res.redirect("/favourites");
    // const favouriteHomeId = req.params.favouriteId;
    //
    // Favourite.findOneAndDelete({houseId: favouriteHomeId }).then(()=>{
    //     console.log("deleted fac")
    // }).catch(error=>{
    //     if(error){
    //         console.log("error while deleting favourite host home", error)
    //     }
    // }).finally(()=>{
    //     res.redirect("/favourites");
    // });
}
