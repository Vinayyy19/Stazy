const {reviewSchema,schema} = require("./Validate.js");
const ExpressError = require("./Extra/ExpressError.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
      req.session.redirectUrl = req.originalUrl;
        req.flash("failed","You must login in first");
       return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next)=>{
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
}

module.exports.ValidateData = (req,res,next)=>{
    let {error} = schema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=>el.message).join(",");
      throw new ExpressError (404,errMsg);
    } else {
      next();
    }
  }

module.exports.Validatereview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body.review);
    if(error){
      let errMsg = error.details.map((el)=>el.message).join(",");
      console.log(error);
      throw new ExpressError (404,errMsg);
    } else {
      next();
    }
  }