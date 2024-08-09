const listings = require("../model/listing");
const review = require("../model/review");

module.exports.addReview =  async(req,res)=>{
    const { id } = req.params;
    let listing =  await listings.findById(id);
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review Added");
    res.redirect(`/show/listing/${id}`);
  }

module.exports.distroyReview =  async(req,res)=>{
    const { id , reviewId} = req.params;
    await listings.findByIdAndUpdate(id,{$pull:{Review:reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted");
    res.redirect(`/show/listing/${id}`);
  }