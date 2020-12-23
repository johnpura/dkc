const express = require('express');
const router = express.Router();

/**
 * Renders landing page
 */
router.get('/', function(req, res, next) {
  const locals = {
    pageTitle: 'Welcome',
  };
  res.render('index', locals);
});

/**
 * Renders login page
 */
router.get('/signin', function(req, res, next) {
  const locals = {
    pageTitle: 'Sign Up',
    template: 'uk-margin-large-top',
    flashMsg: req.flash('message'),
  };
  res.render('signin', locals);
});

/**
 * Renders registration page
 */
router.get('/register', function(req, res, next) {
  const locals = {
    pageTitle: 'Create Account',
    template: 'uk-margin-large-top',
  };
  res.render('signup', locals);
});

module.exports = router;
