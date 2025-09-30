const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/addHome", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
  });
};

exports.getHostHomes = (req, res, next) => {
  Home.fetchAll().then(([registeredHomes]) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { houseName, price, location, rating, photoUrl , description} = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description);
  home.save().then(()=>{
    res.render("host/home-added", {
      pageTitle: "Home Added Successfully",
      currentPage: "homeAdded",
    });
  }).catch(err=>console.error("error while creating home", err)  );
};

exports.editHostHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then(([homes])=>{
    const home = homes[0]
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
  const {id, houseName, price, location, rating, photoUrl, description } = req.body;
  const home = new Home(houseName, price, location, rating, photoUrl, description, id);
  home.save();

  return res.redirect("/host/host-home-list");

}

exports.deleteHostHome=(req, res, next)=>{
  const homeId = req.params.homeId;
  Home.deleteById(homeId).then(()=>{
    return res.redirect("/host/host-home-list");
  }).catch(error=>{
      console.log("error while deleting host home", error)
  });
}
