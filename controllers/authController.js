const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User.model');

module.exports.getUser = (req, res) => {
    res.status(200).json({ user: req.user });
}

module.exports.signUp = (req, res) => {

    const { email, password, firstName, lastName } = req.body;

    // Check if email is already in Database
    User.findOne({ email })
        .then(foundUser => {
            if (foundUser) {
                res.status(409).json({ message: 'Cette adresse E-mail est déjà utilisée' });
                return;
            }

            const salt = bcrypt.genSaltSync(10);
            const hashPass = bcrypt.hashSync(password, salt);

            const aNewUser = new User({
                email: email,
                password: hashPass,
                firstName: firstName,
                lastName: lastName,
            });

            aNewUser.save()
                .then(() => {
                    // save user in session: req.user
                    req.login(aNewUser, err => {
                        if (err) {
                            // Session save went bad
                            console.log(err)
                            res.status(400).json({ message: err.message });
                            return;
                        }

                        // All good, we are now logged in and `req.user` is now set
                        res.status(201).json(aNewUser);
                    });
                })
                .catch(err => {
                    res.status(400).json({ message: "Une erreur lors de la création du compte s'est produite." });
                    console.log(err)
                });
        })
        .catch(err => {
            res.status(400).json({ message: "Une erreur lors de la création du compte s'est produite." });
        });
}

module.exports.login = (req, res) => {

    passport.authenticate('local', (err, theUser, failureDetails) => {

        if (err) {
            // Something went wrong authenticating user
            res.status(400).json({ message: err.message });
            return;
        }

        if (!theUser) {
            // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
            res.status(403).json(failureDetails);
            return;
        }

        // save user in session: req.user
        req.login(theUser, err => {
            if (err) {
                // Session save went bad
                console.log(err)
                res.status(400).json({ message: err.message });
                return;
            }

            // All good, we are now logged in and `req.user` is now set
            res.status(201).json(theUser);
        });
    })(req, res);
}

module.exports.logout = (req, res) => {
    let user = req.user;
    req.logout();
    // res.status(204).send();
    res.status(200).json({ message: `${user.firstName} ${user.lastName} deconnected`, user: false });
}

module.exports.success = (req, res) => {
    res.redirect(`${process.env.REACT_URL}`);
}

module.exports.failure = (req, res) => {
    console.log('failure')
    res.redirect(`${process.env.REACT_URL}/login`);
    //res.status(200).json({ message: 'Login with Facebook failed' })
}