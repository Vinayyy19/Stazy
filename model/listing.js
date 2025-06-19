const mongoose = require('mongoose');
const schema = mongoose.Schema;
const Review = require("./review");

const listingSchema = new schema ({
    title:String,
    description:String,
    image:{
      url:String,
      fileName:String
    },
    price:Number,
    location:String,
    geometry: {
      type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
   },
    country:String,
    review:[{
       type: schema.Types.ObjectId,
       ref:"Review",
    }],
    owner:{
      type: schema.Types.ObjectId,
      ref:"User",
   },
   isAvailable: {
        type: Boolean,
        default: true 
    },
    availableFrom: Date,
    availableTo: Date,
});

listingSchema.post("findOneAndDelete",async(listing)=>{
   if(listing){
      await Review.deleteMany({_id:{$in : listing.review}});
   }
});

const listing = mongoose.model("listing",listingSchema);
module.exports = (listing);