const express = require("express");
const router = express.Router();
const WrapAsync = require("../Extra/WrapAsync");
const {Validatereview,isLoggedIn} = require("../middleWare.js");
const reviewController = require("../controller/review.js");

// Review Route
router.post("/listing/:id/review",isLoggedIn,Validatereview, WrapAsync(reviewController.addReview));
  
  // Review Route Delete
  router.delete("/listing/:id/review/:reviewId",WrapAsync(reviewController.distroyReview));

  module.exports = router;