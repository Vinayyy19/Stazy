const User = require("../model/User.js");

module.exports.signUp = async (req, res) => {
    try {
      const { email, Username, Password } = req.body;
      const newUser = new User({ email, username: Username });
      const registerUser = await User.register(newUser, Password);
      req.login(registerUser,(err)=>{
        if(err){
          return next(err);
        }
        req.flash("success", "Welcome to Stazy");
        return res.redirect("/");
      });
    } catch (err) {
      req.flash("failed", err.message);
      res.redirect("/signup");
    }
  }

module.exports.login = async(req, res) => {
    req.flash("success","Welcome to Stazy");
    let redirectUrl = res.locals.redirectUrl || "/";
    res.redirect(redirectUrl);
  }

module.exports.logOut = function(req, res, next){
    req.logout(function(err) {
      if (err) { return next(err); }
      req.flash("success","Logged Out Successfully");
      res.redirect('/');
    });
  }

// Rough 

// router.post("/login", async (req, res, next) => {
//   const user = await User.find({username:req.body.username});
//   console.log(req.body);
//   console.log(user);
//   passport.authenticate("local", (err, user, info) => {
//     if (err) {
//       console.log(err);
//       return next(err);
//     }
//     if (!user) {
//       req.flash('failed', 'Invalid username or password');
//       return res.redirect('/login');
//     }
//     req.logIn(user, (err) => {
//       if (err) {  
//         console.log(err);
//         return next(err);
//       }
//       req.flash('success', 'Successfully logged in');
//       req.session.save((err) => {
//         if (err) {
//           console.log(err);
//           return next(err);
//         }
//         res.redirect('/');
//       });
//     });
//   })(req, res, next);
// });
// function print(req,res,next){
//   console.log(" req is coming ");
//   next();
// }