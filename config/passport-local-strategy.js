const passport = require('passport');


const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true
},
function(req,email,password,done){
//find a user and establish the identity
User.findOne({email:email},function(err,user){
    if(err){
        req.flash('error',err);
        //console.log('Error in finding user ---> passport');
        return done(err);
    }
    if(!user||user.password!=password){
        req.flash('error','Invalid Username/Password');
        //console.log('Invalid username/password');
        return done(null,false);
    }
    return done(null,user);
});
}
));



 passport.serializeUser(function(user,done){
    done(null,user.id);
 });
 passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user---> passport');
            return done(err);
        }
        return done(null,user);
    });
 });



 //check if the user is authenticated
 passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/usres/sign-in');
 }

 passport.setAuthenticatedUser = function(req,res,next){
    //setting user detail in ejs file
    if(req.isAuthenticated()){
        res.locals.user  = req.user;
    }
    next();
 }


 module.exports = passport;

