const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../model/listing.js");

main().then(()=>{console.log("connected to database");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/WonderLust');
}

const data = async () =>{
    await listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"668c1df6d158ea7384a28c90"}))
    await listing.insertMany(initData.data);
    console.log("data inserted");
}

data();