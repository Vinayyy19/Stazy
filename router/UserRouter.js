const express = require("express");
const router = express.Router();
const WrapAsync = require("../Extra/WrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleWare.js");
const UserController = require("../controller/user.js");

router.route("/signup")
.get((req, res) => {
  res.render("../views/listing/signup.ejs");
})
.post(WrapAsync(UserController.signUp));

router.route("/login")
.get((req, res) => {
  res.render("../views/listing/login.ejs", { error: req.flash("error") });
})
.post(saveRedirectUrl,
  passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }),
  UserController.login
);

router.get('/logout', UserController.logOut);

module.exports = router;
