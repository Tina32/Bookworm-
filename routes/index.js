var express = require('express');
var router = express.Router();
var passport = require('passport');


/* GET index. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Bookworm', message: req.flash() });  // add the message
});

// GET /home
// router.get('/home', function(req, res, next) {
//   res.render('home.ejs', { message: req.flash() });
// });

// POST /signup
router.post('/signup', function(req, res, next) {
  var signUpStrategy = passport.authenticate('local-signup', function(err, user, info) {
    var error = err || info;
    if (error) { return res.status(401).json(error); }
    if (!user) { return res.status(404).json( { message: 'Something went wrong, please try again.' }); }
    res.json( { message: 'Welcome aboard' } );
  });
  return signUpStrategy(req, res, next);
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', function(err, user, info) {
    var error = err || info;
    if (error) { return res.status(401).json(error); }
    if (!user) { return res.status(404).json( { message: 'Something went wrong, please try again.' }); }
    res.json( { message: 'Welcome aboard' } );
  });

  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.json('Yep!');
});

// Restricted page
router.get('/secret', function(req, res, next) {
  if (currentUser) {
    res.json('secret.ejs');
  }
  else {
    res.json('/');
  }
});

module.exports = router;
