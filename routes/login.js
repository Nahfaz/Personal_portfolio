import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';

import User from '../models/user.js';
import { getAllUsers } from '../controllers/users.js';


const router = express.Router();

const LocalStrategy = passportLocal.Strategy;

// authUser = (user, password, done) => {
//     console.log(`Value of "User" in authUser function ----> ${user}`)         //passport will populate, user = req.body.username
//     console.log(`Value of "Password" in authUser function ----> ${password}`) //passport will popuplate, password = req.body.password

// // Use the "user" and "password" to search the DB and match user/password to authenticate the user
// // 1. If the user not found, done (null, false)
// // 2. If the password does not match, done (null, false)
// // 3. If user found and password match, done (null, user)
    
//     let authenticated_user = { id: 123, name: "Kyle"} 
// //Let's assume that DB search that user found and password matched for Kyle
    
//     return done (null, authenticated_user ) 
// }

passport.use(new LocalStrategy(
    function(username, password, done) {
        try {
            const user = User.findOne({username: username, password: password}).then((user)=> {
                console.log(user);
                if (!user) { return done(null, false); }
                // if (!user.verifyPassword(password)) { return done(null, false); }
                return done(null, user);
            })
        } catch (error) {
            console.log(error);
        }
    //   User.findOne({ username: username }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) { return done(null, false); }
    //     if (!user.verifyPassword(password)) { return done(null, false); }
    //     return done(null, user);
    //   });
    }
  ));

passport.serializeUser( (user, done) => { 
    console.log(`--------> Serialize User`)
    console.log(user)     

    done(null, user.id)
  
// Passport will pass the authenticated_user to serializeUser as "user" 
// This is the USER object from the done() in auth function
// Now attach using done (null, user.id) tie this user to the req.session.passport.user = {id: user.id}, 
// so that it is tied to the session object

} )


passport.deserializeUser((id, done) => {
        console.log("---------> Deserialize Id")
        console.log(id)

        done (null, {name: "Kyle", id: 123} )      
  
// This is the id that is saved in req.session.passport.{ user: "id"} during the serialization
// use the id to find the user in the DB and get the user object with user details
// pass the USER object in the done() of the de-serializer
// this USER object is attached to the "req.user", and can be used anywhere in the App.

});

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { 
         return res.redirect("/");
    }
    next()
}

router.get("/", checkAuthenticated, (req, res) => {
    // let users = getAllUsers();
    // console.log(users);
    res.render("../views/login.html.ejs");
});

router.post ("/", passport.authenticate('local', {
    successRedirect: "/",
    failureRedirect: "/login",
}));

// router.get("/", (req, res) => {
//     res.render("../views/home.html.ejs", { name: req.user.username });
// });

export default router;