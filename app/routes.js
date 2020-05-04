const convert = require("xml-js");
const fetch = require("node-fetch");

module.exports = function (app, passport, db, multer, ObjectId) {
  let goodreadsAPI = "pkPx0CaPv5dLSjiSVwWexA";


  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get("/", function (req, res) {
    res.render("index.ejs");
  });

  // PROFILE SECTION =========================


  app.get("/profile", isLoggedIn, function (req, res) {
    db.collection("users").find({ "local.email": req.user.local.email })
      .toArray(async (err, result) => {
        if (err) return console.log(err);
        res.render("profile.ejs", {
          user: req.user,
          demoday: result,
          favGenres: result[0].favGenres,
        });
      });
  });

  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // GENRE COUNT INCREASE ===============================================================
  app.get('/genreStats', (req, res) => {
      db.collection('users')
      .find({ _id: req.user._id })
        .toArray(async (err, result) => {
          if (err) return res.send(err)
          res.send(result[0].genreCount)
      })
    })

  app.put('/genreCount', (req, res) => {
      console.log(req.body)
      console.log(req.user);
      let genreTitle = req.body.genreTitle
      let genreCountSearch = 'genreCount.' + genreTitle
      db.collection('users')
      .findOneAndUpdate({ _id: req.user._id }, {
        // this allows you to increment count by wahter num you like
        $inc: {
          [genreCountSearch]: 1
        }
      }, {
        sort: {_id: -1},
        upsert: true
      }, (err, result) => {
        if (err) return res.send(err)
        res.send(result)
      })
    })

    // SAVE FAVORITE BOOKS ===============================================================

    app.post('/fave', (req, res) => {
      let uId = ObjectId(req.session.passport.user)
      db.collection('favorites').save({
        posterId: uId,
        bookTitle: req.body.bookTitle,
        bookAuthor: req.body.bookAuthor,
        bookImg: req.body.bookImg
      },(err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.send('Favorite Saved!')
      })
    })

    app.get('/fave', isLoggedIn, function(req, res) {
        let uId = ObjectId(req.session.passport.user)
        db.collection('favorites').find({'posterId': uId}).toArray((err, result) => {
          if (err) return console.log(err)
          res.render('fave.ejs', {
            user : req.user,
            favorites: result
          })
        })
    });


    // REMOVE FAVE BOOK ===============================================================

    app.delete('/faveDelete', (req, res) => {
      let postId = ObjectId(req.body.postId)
      db.collection('favorites').findOneAndDelete({
        _id: postId,
      }, (err, result) => {
        if (err) return res.send(500, err)
        res.send('Message deleted!')
      })
    })



  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get("/login", function (req, res) {
    res.render("login.ejs", { message: req.flash("loginMessage") });
  });

  // process the login form
  app.post("/login",
    passport.authenticate("local-login", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/login", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );

  // SIGNUP =================================
  // show the signup form
  app.get("/signup", function (req, res) {
    res.render("signup.ejs", { message: req.flash("signupMessage") });
  });

  // process the signup form
  app.post("/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/profile", // redirect to the secure profile section
      failureRedirect: "/signup", // redirect back to the signup page if there is an error
      failureFlash: true, // allow flash messages
    })
  );


  // INTERESTS =================================
  app.get("/interests", isLoggedIn, (req, res) => {
    db.collection("users")
      .find({ "local.email": req.user.local.email })
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("interests.ejs", {
          userId: result[0]._id,
          genres: result[0].genres,
        });
      });
  });

  app.put("/interests", isLoggedIn, (req, res) => {
    db.collection("users").findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          genres: req.body.genres,
          favGenres: req.body.favGenres,
        },
      },
      {
        upsert: false,
        new: true,
      },
      (err, result) => {
        if (err) return res.send(err);
        // res.send(200)
        console.log("saved to database");
        res.redirect("/profile");
      }
    );
  });

  // BOOKPAGE =================================


  app.get("/bookpage", isLoggedIn, (req, res) => {
    db.collection("users").find({ "local.email": req.user.local.email })
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("bookpage.ejs", {
        });
      });
  });


  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get("/unlink/local", function (req, res) {
    var user = req.user;
    user.local.email = undefined;
    user.local.password = undefined;
    user.save(function (err) {
      res.redirect("/profile");
    });
  });
};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}
