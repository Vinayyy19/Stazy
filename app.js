if(process.env.NODE_ENV!="production"){
    require('dotenv').config();
}
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require('method-override');
const engine = require('ejs-mate');
const ExpressError = require("./Extra/ExpressError.js");
const listingRoute = require('./router/listingRouter.js');
const reviewRoute = require('./router/reviewRouter.js');
const UserRoute = require('./router/UserRouter.js');
const flash = require("connect-flash");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const User = require("./model/User.js");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const chatbotRoute = require('./router/chatbot.js'); 

// database connection
main().then(()=>{console.log("connected to database");})
.catch(err => console.log(err));
async function main() {
    await mongoose.connect(process.env.dburl);
}

const store = MongoStore.create({
    mongoUrl: process.env.dburl,
    crypto: {
        secret: process.env.secret
    },
    touchAfter: 24*3600,
})

store.on("err",()=>{
    console.log("error occured in atlas",err);
});

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname,"views"));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use(express.json()); 
// -------------------------

app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"public")));
app.use(session({
    store,
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly : true,
        // secure: true,
        expiry: Date.now * 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}));
app.use(flash());

// passport setup for authorization and authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// local setup
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.failed = req.flash("failed");
    res.locals.CurrUser = req.user;
    next();
});

// rendering routes
app.use("/",listingRoute);
app.use("/",reviewRoute);
app.use("/",UserRoute);
app.use("/chatbot", chatbotRoute); 

// page not found error
app.all("*",(req,res,next)=>{
    next( new ExpressError(404,"Page Not Found"));
})

// none functional Route Error Generator
app.use((err,req,res,next)=>{
    res.render("listing/Error.ejs",{err});
});

// Server Starting
app.listen(8080,()=>{
    console.log("server working");
});