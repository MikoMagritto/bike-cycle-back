const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User.model');

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((user, cb) => cb(null, user._id));

    passport.deserializeUser((id, cb) => {
        User.findById(id)
            .then(user => cb(null, user))
            .catch(err => cb(err));
    });

    //Local Strategy
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email', // by default
                passwordField: 'password' // by default
            },
            (email, password, done) => {
                User.findOne({ email })
                    .then(user => {
                        if (!user) {
                            return done(null, false, { message: `Aucun compte utilisateur n'est relié à ${email}` });
                        }

                        if (!bcrypt.compareSync(password, user.password)) {
                            return done(null, false, { message: `Le mot de passe ne correspond pas à l'adresse ${email}` });
                        }

                        done(null, user);
                    })
                    .catch(err => done(err));
            }
        )
    );

    //Facebook Strategy    
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ['id', 'emails', 'name']
    },
        function (accessToken, refreshToken, profile, done) {

            // to see the structure of the data in received response:
            console.log("Facebook account details:", profile);

            User.findOne({ facebookID: profile.id }, function (err, user) {
                // if there is an error, stop everything and return that
                // ie an error connecting to the database
                if (err)
                    return done(err);

                // if the user is found, then log them in
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // if Facebook doesn't return an email
                    let emailFromFacebook;
                    if (profile.emails) emailFromFacebook = profile.emails[0].value;

                    const aNewUser = new User({
                        facebookID: profile.id,
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: emailFromFacebook
                    });

                    aNewUser.save(function (err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        return done(null, aNewUser);
                    })
                }
            });
        }));
}