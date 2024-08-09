const mongoose = require('mongoose');
const schema = mongoose.Schema;

const reviewSchema = new schema ({
    comment:String,
    author:{
        type: schema.Types.ObjectId,
        ref:"User",
     },
    rating: {
        type:Number,
        min:1,
        max:5,
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    }
});

const review = mongoose.model("Review",reviewSchema);
module.exports = review;