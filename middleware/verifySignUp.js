const User = require('../models/User.model');

const verifySignUp = (req, res, next) => {

    const { email, password, firstName, lastName } = req.body;

    // 1. Check email and password are not empty
    if (!email || !password) {
        res.status(400).json({ message: 'Merci de saisir une adresse E-mail et un mot de passe' });
        return;
    }

    // 2. Check firstName and lastName are not empty
    if (!firstName || !lastName) {
        res.status(400).json({ message: 'Merci de saisir votre nom et votre prénom' });
        return;
    }

    //3. Check email is valid
    const regexEmail = /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

    if (!regexEmail.test(email)) {
        res.status(403).json({ message: "L'adresse E-mail saisie n'est pas valide" });
        return;
    }

    //4. Check password is strong
    const regexPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!regexPassword.test(password)) {
        res.status(403).json({ message: 'Le mot de passe doit contenir au moins 6 charactères, un chiffre et une minuscule et une majuscule' });
        return;
    }

    //5. Check email already in DataBase
    User.findOne({ email })
        .then(foundUser => {
            if (foundUser) {
                res.status(409).json({ message: 'Cette adresse E-mail est déjà utilisée' });
                return;
            }
        })
        .catch(err => {
            res.status(400).json({ message: "Une erreur lors de la création du compte s'est produite." });
        });
    next();
}

module.exports = verifySignUp;