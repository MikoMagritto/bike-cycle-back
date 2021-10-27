const express = require('express');
const passport = require('passport');
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../middleware/ensureAuthenticated');
const verifySignUp = require('../middleware/verifySignUp');

authRoutes.get('/',authController.test);
//Local strategy
authRoutes.post('/users', verifySignUp, authController.signUp);
authRoutes.post('/sessions', authController.login);
authRoutes.get('/private', ensureAuthenticated, authController.getPrivate);

//Facebook strategy
authRoutes.get('/auth/facebook', passport.authenticate('facebook'));
authRoutes.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));


authRoutes.delete('/session', authController.logout);

module.exports = authRoutes;