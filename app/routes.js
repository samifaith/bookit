const convert = require('xml-js')
const fetch = require('node-fetch')

module.exports = function(app, passport, db, multer, ObjectId) {
let goodreadsAPI = "pkPx0CaPv5dLSjiSVwWexA"

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs');
    });

    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
        let uId = ObjectId(req.session.passport.user)
        db.collection('demoday').find({'posterId': uId}).toArray(async (err, result) => {
          if (err) return console.log(err)
          let gResult = await getBooks()
          res.render('profile.ejs', {
            user : req.user,
            demoday : result,
            goodreads : gResult.GoodreadsResponse.search.results.work
          })
        })
    });

    app.get('/profile/:genre', isLoggedIn, function(req, res){
      db.collection('users').find({'local.email': req.user.local.email}).toArray((err, result) => {
        if (err) return console.log(err)
        console.log(result.genres)
        res.render('interests.ejs', {
          genres: result[0].genres
        })
      })
    })

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

    function getBooks () {
      return fetch(`https://www.goodreads.com/search.xml?key=${goodreadsAPI}&q=Ender%27s+Game`)
        .then(res => res.text()) // parse response as JSON (can be res.text() for plain response)
        .then(response => {
          // console.log(response)
          let options = {
            compact: true,
            nativeType: true,
            ignoreDeclaration: true,
            ignoreInstruction: true,
            ignoreComment: true,
            ignoreDoctype: true,
            ignoreCdata: true
          }
          let xmlResponse = convert.xml2json(response, options)
          console.log(xmlResponse)
          return JSON.parse(xmlResponse)
        })
        .catch(err => {
            console.log(`error ${err}`)
        })
    }
    // app.post('/interests', (req, res) => {
    //   res.redirect('/interests')
    // })
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });




// message board routes ===============================================================

    // app.post('/messages', (req, res) => {
    //   db.collection('demoday').save({name: req.body.name, msg: req.body.msg, thumbUp: 0, thumbDown:0}, (err, result) => {
    //     if (err) return console.log(err)
    //     console.log('saved to database')
    //     res.redirect('/profile')
    //   })
    // })

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
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/interests', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


        // INTERESTS =================================
        app.get('/interests',isLoggedIn, (req, res) => {
          db.collection('users').find({'local.email': req.user.local.email}).toArray((err, result) => {
            if (err) return console.log(err)
            res.render('interests.ejs', {
              userId: result[0]._id,
              genres: result[0].genres
            })
          })
        });

        app.post('/interests',isLoggedIn, (req, res) => {
          db.collection('users').save({genres: req.body.genres}, (err, result) => {
            if (err) return console.log(err)
            console.log('saved to database')
            res.redirect('/profile')
          })
        })

        app.put('/interests',isLoggedIn, (req, res) => {
          db.collection('users').findOneAndUpdate({_id: req.user._id}
            ,{
            $set: {
              genres: req.body.genres
            }
          }, {
              upsert: false,
              new: true
          }, (err, result) => {
            if (err) return res.send(err)
            res.send(200)
          })
        })


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
    app.get('/unlink/local',   function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
}
