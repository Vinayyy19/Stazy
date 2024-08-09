const multer  = require('multer');
const express = require("express");
const router = express.Router();
const WrapAsync = require("../Extra/WrapAsync");
const {isLoggedIn,ValidateData} = require("../middleWare.js");
const ListingController = require("../controller/listing.js");
const storage = require("../cloudconf.js")
const upload = multer(storage);

  // Delete Route
  router.delete("/delete/:id", isLoggedIn, WrapAsync (ListingController.destroyListing));
  
  // Edit Saving
  router.patch("/edit/:id", isLoggedIn,upload.single("image"), ValidateData, WrapAsync (ListingController.EditSaving));
  
  // New Listing Save Route
  router.post("/new/listing",isLoggedIn,upload.single("image"),ValidateData, WrapAsync (ListingController.newListingSave));
  // router.post("/new/listing",upload.single("image"),(req,res)=>{console.log(req.file);res.send(req.file)});

  // Edit Route
  router.get("/show/listing/edit/:id",isLoggedIn, WrapAsync (ListingController.editRoute));
  
  // Show Listing Route
  router.get("/show/listing/:id", WrapAsync (ListingController.ShowListingRoute));
  
// New Route
router.get("/new",isLoggedIn,(req,res)=>{
    res.render("listing/new.ejs");
  });
  
  // Home Route
  router.get("/", WrapAsync (ListingController.HomeRoute));

  module.exports = router;