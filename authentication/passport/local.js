const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const User = require('../../models/User');

passport.use(new LocalStrategy((username, password, done) => {

    const usernameRegex = new RegExp(username,"ig")

    User.findOne({username: usernameRegex}, (err, user) => {
        if (err) return done(err, null, {message: "An error occured!"});
        if (!user) return done(null, false, {message: "Username & password doesn't match!"});
        if (user && password === user.password) {
          //  req.user
          return done(null, user, {message: 'Login successful.'});
        } 
        if (user && password !== user.password) return done(null, false, {message: "Username & password doesn't match!"});
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });