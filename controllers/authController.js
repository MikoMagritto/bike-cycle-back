const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

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
                    // Persist our new user into session
                    req.session.currentUser = aNewUser;
                    res.status(201).json({ message: `Compte utilisateur créé avec succès ${email}` });
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
    res.status(200).json({ message: 'login' })
}