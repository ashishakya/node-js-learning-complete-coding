const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.find().then((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photo , description} = req.body;

  const home = new Home({houseName, price, location, rating, photo, description});
  home.save().then(()=>{
    console.log("**** home added successfully ****")
    res.render("host/home-added", {
      pageTitle: "Home Added Successfully",
      currentPage: "homeAdded",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  }).catch(err=>console.error("error while creating home", err)  );
};

exports.editHostHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then(home=>{
    if(!home){
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      pageTitle: "Edit Home to airbnb",
      currentPage: "addHome",
      editing,
      home,
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  })
};

exports.updateHostHome=(req, res, next)=>{
  const {id, houseName, price, location, rating, photo, description } = req.body;
  Home.findById(id).then((home)=>{
    home.houseName=houseName
    home.price=price
    home.location=location
    home.rating=rating
    home.photo=photo
    home.description=description
    home.save().then((result)=>{
      console.log("home is updated");
      return res.redirect("/host/host-home-list");
    })
  });
  // const home = new Home(houseName, price, location, rating, photo, description, id);
  // home.save().then(result=>{
  //   return res.redirect("/host/host-home-list");
  // });
}

exports.deleteHostHome=(req, res, next)=>{
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId).then(()=>{
    return res.redirect("/host/host-home-list");
  }).catch(error=>{
      console.log("error while deleting host home", error)
  });
}
