const express = require('express');
const passport = require('passport');
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated } = require('../middleware/ensureAuthenticated');
const verifySignUp = require('../middleware/verifySignUp');

//Local strategy
authRoutes.post('/users', verifySignUp, authController.signUp);
authRoutes.post('/sessions', authController.login);
authRoutes.get('/session',ensureAuthenticated, authController.getUser)


authRoutes.get('/private', ensureAuthenticated, authController.getPrivate);

//Facebook strategy
authRoutes.get('/successFacebookLogin',authController.success);
authRoutes.get('/failureFacebookLogin',authController.failure);

authRoutes.get('/auth/facebook', passport.authorize('facebook', { scope : ['email'] }));
authRoutes.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/successFacebookLogin',
        failureRedirect: '/failureFacebookLogin'
    }));

authRoutes.delete('/session', ensureAuthenticated, authController.logout);

module.exports = authRoutes;