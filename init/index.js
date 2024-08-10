const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../model/listing.js");

main().then(()=>{console.log("connected to database");})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.dburl);
}

const data = async () =>{
    await listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:process.env.demoUSer}))
    await listing.insertMany(initData.data);
    console.log("data inserted");
}

data();
