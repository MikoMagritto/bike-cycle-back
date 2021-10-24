const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
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
                            return done(null, false,`Aucun compte utilisateur n'est relié à ${email}`);
                        }

                        if (!bcrypt.compareSync(password, user.password)) {
                            return done(null, false, `Le mot de passe ne correspond pas à l'adresse ${email}`);
                        }

                        done(null, user);
                    })
                    .catch(err => done(err));
            }
        )
    );
}