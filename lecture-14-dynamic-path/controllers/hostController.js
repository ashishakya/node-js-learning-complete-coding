const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.save();

  res.render("host/home-added", {
    pageTitle: "Home Added Successfully",
    currentPage: "homeAdded",
  });
};

exports.editHostHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId, home=>{
    if(!home){
      return res.redirect("/host/host-home-list");
    }
    res.render("host/edit-home", {
      pageTitle: "Edit Home to airbnb",
      currentPage: "addHome",
      editing,
      home
    });
  })
};

exports.updateHostHome=(req, res, next)=>{
  // console.log("updated value>>>>", req.body)
  // res.send("updatedd");

  const {id, houseName, price, location, rating, photoUrl } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl);
  home.id = id;
  home.save();

  return res.redirect("/host/host-home-list");

  // res.render("host/host-home-list", {
  //   pageTitle: "Home Updated Successfully",
  //   currentPage: "homeAdded",
  // });
}

exports.deleteHostHome=(req, res, next)=>{
  const homeId = req.params.homeId;
  console.log("deletedd>>>>", homeId);

  return res.redirect("/host/host-home-list");
}
