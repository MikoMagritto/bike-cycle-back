const express = require('express');
const passport = require('passport');
const authRoutes = express.Router();
const authController = require('../controllers/authController');
const { ensureAuthenticated, ensureNotAuthenticated, isAuthenticated } = require('../middleware/ensureAuthenticated');
const { verifySignUp } = require('../middleware/verifyFormInput');

//Local strategy
authRoutes.post('/users', ensureNotAuthenticated, verifySignUp, authController.signUp);
authRoutes.post('/sessions', ensureNotAuthenticated, authController.login);
authRoutes.get('/session', isAuthenticated, authController.getUser)

//Facebook strategy
authRoutes.get('/successFacebookLogin', authController.success);
authRoutes.get('/failureFacebookLogin', authController.failure);

authRoutes.get('/auth/facebook', passport.authorize('facebook', { scope: ['email'] }));
authRoutes.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/successFacebookLogin',
        failureRedirect: '/failureFacebookLogin'
    }));

authRoutes.delete('/session', ensureAuthenticated, authController.logout);

module.exports = authRoutes;