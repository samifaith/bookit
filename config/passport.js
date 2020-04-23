var LocalStrategy   = require('passport-local').Strategy;
var User       		= require('../app/models/user');
var GoodreadsStrategy = require('passport-goodreads').Strategy;
module.exports = function(passport) {

	// =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.serializeUser(function(user, done) {
      done(null, user);
    });

    passport.deserializeUser(function(obj, done) {
      done(null, obj);
    });

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'
    passport.use(new GoodreadsStrategy({
        consumerKey: "pkPx0CaPv5dLSjiSVwWexA",
        consumerSecret: "3XGPhAHVl1nhDRWRMFnANExCn75Le5DKnRlrjez54",
        passReqToCallback : true
      },
      function(token, tokenSecret, profile, done) {
        User.findOrCreate({ goodreadsId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

				// if there is no user with that email
                // create the user
                var newUser            = new User();

                // set the user's local credentials
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password); // use the generateHash function in our user model
                newUser.local.firstName = req.body.firstName;
<<<<<<< Updated upstream
                newUser.local.lastName = req.body.lastName
=======
                newUser.local.lastName = req.body.lastName;
>>>>>>> Stashed changes
                newUser.genres = {
                  romance : false,
                  mystery : false,
                  fantasy : false,
                  scienceFiction : false,
<<<<<<< Updated upstream
                  thrillers : false,
=======
                  thriller  : false,
>>>>>>> Stashed changes
                  youngAdult : false,
                  nonFiction : false,
                  fiction : false,
                  selfhelp : false
<<<<<<< Updated upstream
=======
                };
                newUser.genreCount = {
                  romance : 0,
                  mystery : 0,
                  fantasy : 0,
                  scienceFiction : 0,
                  thriller  : 0,
                  youngAdult : 0,
                  nonFiction : 0,
                  fiction : 0,
                  selfhelp : 0
>>>>>>> Stashed changes
                }

  				// save the user

                  newUser.save(function(err) {

                      if (err){

                          throw err;

                };

                    return done(null, newUser);
                });
            }

        });

    }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                return done(err);

            // if no user is found, return the message
            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

            // if the user is found but the password is wrong
            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            // all is well, return successful user
            return done(null, user);
        });

    }));

};
