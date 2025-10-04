exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    currentPage: "login",
    isLoggedIn: req.isLoggedIn
  });
};

exports.postLogin = (req, res, next)=>{
  // req.isLoggedIn = true;
  // res.cookie("isLoggedIn", true)
  req.session.isLoggedIn = true
  res.redirect("/");
}

exports.postLogout = (req, res, next)=>{
  // res.cookie("isLoggedIn", false)
  req.session.destroy(()=>{
    res.redirect("/login");
  })
}
