const convert = require("xml-js");
const fetch = require("node-fetch");

module.exports = function (app, passport, db, multer, ObjectId) {
  let goodreadsAPI = "pkPx0CaPv5dLSjiSVwWexA";

  // let cleanTopics = topics.map((topic) => {
  //   return cleanTopic(topic)
  // })
  //
  // function cleanTopic(topic){
  //   return topic.toLowerCase().replace("-", "")
  // }

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get("/", function (req, res) {
    res.render("index.ejs");
  });

  // PROFILE SECTION =========================

  // app.get('/profile/:genre', isLoggedIn, function(req, res){
  //   db.collection('users').find({'local.email': req.user.local.email}).toArray((err, result) => {
  //     if (err) return console.log(err)
  //     console.log(result.genres)
  //     res.render('interests.ejs', {
  //       genres: result[0].genres
  //     })
  //   })
  // })

  // app.get('/profile', isLoggedIn, function(req, res) {
  //   db.collection('demoday').find().toArray(async (err, result) => {
  //     if (err) return console.log(err)
  //     let gResult = await getBooks()
  //     console.log(gResult)
  //     res.render('profile.ejs', {
  //       user : req.user,
  //       demoday : result,
  //       goodreads : gResult.GoodreadsResponse.search.results.work
  //     })
  //   })
  // });



<<<<<<< Updated upstream
  function getBooks() {
    return fetch(
      'https://www.googleapis.com/books/v1/volumes?q=subject:romance&filter=ebooks&orderBy=relevance&printType=books&startIndex=0&maxResults=40'
    )
      .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
      .then((response) => {
        document.getElementById('imgBook1').src = `${response.items[0].volumeInfo.imageLinks.thumbnail}`
        document.getElementById('imgBook2').src = `${response.items[1].volumeInfo.imageLinks.thumbnail}`
        // console.log(response.items[0].volumeInfo)
        // console.log(response.items[0].volumeInfo.imageLinks.thumbnail)
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  }

=======
>>>>>>> Stashed changes
  app.get("/profile", isLoggedIn, function (req, res) {
    db.collection("users").find({ "local.email": req.user.local.email })
      .toArray(async (err, result) => {
        if (err) return console.log(err);
<<<<<<< Updated upstream
        let bResult = await getBooks();
=======
>>>>>>> Stashed changes
        res.render("profile.ejs", {
          user: req.user,
          demoday: result,
          favGenres: result[0].favGenres,
        });
      });
  });

  // function getBooks() {
  //   return fetch(
  //     'https://www.googleapis.com/books/v1/volumes?q=subject:romance&filter=ebooks&orderBy=relevance&printType=books&startIndex=0&maxResults=40'
  //   )
  //     .then((res) => res.json()) // parse response as JSON (can be res.text() for plain response)
  //     .then((response) => {
  //       response.items.map(({volumeInfo}) => {
  //         if (volumeInfo.language == "en" && volumeInfo.averageRating > 3){
  //         console.log(volumeInfo,
  //           volumeInfo.ratingsCount,
  //           volumeInfo.language,
  //           volumeInfo.averageRating,
  //           volumeInfo.previewLink,
  //           volumeInfo.infoLink,
  //           volumeInfo.title,
  //           volumeInfo.authors,
  //           volumeInfo.categories)
  //         }
  //       })
  //     })
  //     .catch((err) => {
  //       console.log(`error ${err}`);
  //     });
  // }
  // app.post('/interests', (req, res) => {
  //   res.redirect('/interests')
  // })
  // LOGOUT ==============================
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

<<<<<<< Updated upstream
  // message board routes ===============================================================
=======
  // GENRE COUNT INCREASE ===============================================================
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
>>>>>>> Stashed changes

  // app.post('/messages', (req, res) => {
  //   db.collection('demoday').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
  //     if (err) return console.log(err)
  //     console.log('saved to database')
  //     res.redirect('/profile')
  //   })
  // })

<<<<<<< Updated upstream
  // app.put('/messages', (req, res) => {
  //   db.collection('demoday')
  //   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
  //     $set: {
  //       thumbUp:req.body.thumbUp + 1
  //     }
  //   }, {
  //     sort: {_id: -1},
  //     upsert: true
  //   }, (err, result) => {
  //     if (err) return res.send(err)
  //     res.send(result)
  //   })
  // })
  //
=======
>>>>>>> Stashed changes
  // app.put('/messagesDown', (req, res) => {
  //   db.collection('demoday')
  //     .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
  //       $set: {
  //         thumbUp:req.body.thumbUp - 1
  //       }
  //     }, {
  //       sort: {_id: -1},
  //       upsert: true
  //     }, (err, result) => {
  //       if (err) return res.send(err)
  //       res.send(result)
  //     })
  //   })
  //

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
  app.post(
    "/login",
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
      successRedirect: "/interests", // redirect to the secure profile section
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
<<<<<<< Updated upstream
=======
  // BOOKPAGE =================================
>>>>>>> Stashed changes

  app.get("/bookpage", isLoggedIn, (req, res) => {
    db.collection("users").find({ "local.email": req.user.local.email })
      .toArray((err, result) => {
        if (err) return console.log(err);
        res.render("bookpage.ejs", {
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
        });
      });
  });

  // app.put('/interests',isLoggedIn, (req, res) => {
  //   db.collection('users').findOneAndUpdate({_id: req.user._id}
  //     ,{
  //     $set: {
  //       genres: req.body.genres
  //     }
  //   }, {
  //       upsert: false,
  //       new: true
  //   }, (err, result) => {
  //     if (err) return res.send(err)
  //     res.send(200)
  //   })
  // })

  // app.delete('/interests', (req, res) => {
  //   db.collection('demoday').findOneAndDelete({
  //     genre: req.body.genre
  //   }, (err, result) => {
  //     if (err) return res.send(500, err)
  //     res.send('Message deleted!')
  //   })
  // })

  // app.get('/interests', function(req, res) {
  //     res.render('interests.ejs', { message: req.flash('signupMessage') });
  // });

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
