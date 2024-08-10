const ExpressError = require("../Extra/ExpressError.js");
const listings = require("../model/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.map_acess;
const GeocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.newListingSave = async(req,res)=>{
  const { title, description, image, price, location, country } = req.body;
    let url = req.file.path;
    let fileName = req.file.filename;

  let response = await GeocodingClient.forwardGeocode({
    query: req.body.location,
    limit: 1
  })
    .send()   

    const newData = new listings({
      title,
      description,
      image,
      price,
      location,
      country
    });
    newData.owner = req.user._id;
    newData.image = {url,fileName}
    newData.geometry = response.body.features[0].geometry;
    let saveData = await newData.save();
    console.log(saveData);
    req.flash("success","New Listing Added");
    res.redirect("/");
  }

module.exports.editRoute = async(req,res)=>{
    let {id} = req.params;    
    let listing = await listings.findById(id);
    if(!listing){
      req.flash("failed","Listing You Trying To find Didn't Exixts");
      res.redirect("/");
    }
    let ogimg = listing.image.url;
    let chngimg = ogimg.replace("/upload","/upload/w_250");
      res.render("listing/edit.ejs",{listing,chngimg});
  }

module.exports.HomeRoute = async (req,res)=>{
    let alllisting = await listings.find({});
    res.render("listing/show.ejs",{alllisting});
}

module.exports.ShowListingRoute = async (req,res)=>{
    let {id} = req.params;
    let listing = await listings.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
    if(!listing){
      req.flash("failed","Listing You Trying To find Didn't Exixts");
      res.redirect("/");
    }
    res.render("listing/showlisting.ejs",{listing});
  }

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await listings.findById(id);
    if (!listing.owner.equals(res.locals.CurrUser._id)){
        req.flash("failed","Only Listing Owner Can edit the post");
        return res.redirect(`/show/listing/${id}`);
      }
     await listings.findByIdAndDelete(id);
     req.flash("success","Listing Deleted");
     res.redirect("/");
  }

module.exports.EditSaving =  async (req, res) => {
    const { id } = req.params;

    const { title, description, image, price, location, country } = req.body;

    const updateObject = {
      title,
      description,
      image,
      price,
      location,
      country
    };
    const listing = await listings.findById(id);
  if (!listing.owner.equals(res.locals.CurrUser._id)){
      req.flash("failed","Only Listing Owner Can edit the post");
      return res.redirect(`/show/listing/${id}`);
    }
    const updatedListing = await listings.findByIdAndUpdate(id, updateObject, { new: true });
    
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let fileName = req.file.filename;
    updatedListing.image = {url,fileName};
    updatedListing.save();
    }

    req.flash("success","Listing updated");  
    if (!updatedListing) {
      return new ExpressError(404, "Listing Not Found!");
    }
    res.redirect(`/show/listing/${id}`);
  }