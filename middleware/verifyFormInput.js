module.exports.verifySignUp = (req, res, next) => {

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
    
    next();
}

module.exports.verifyNewBike = (req, res, next) => {

    const { name, brand, size, address, availability } = req.body;

    // 1. Check name is not empty
    if (!name) {
        res.status(400).json({ message: 'Merci de donner un nom à votre vélo.' });
        return;
    }

    // 2. Check brand is not empty
    if (!brand) {
        res.status(400).json({ message: 'Merci de saisir la marque de votre vélo.' });
        return;
    }

    const listOfSize = ["XS", "S", "M", "L", "XL"];
    // 3. Check size belongs to Enum
    if (listOfSize.indexOf(size) === -1){
        res.status(400).json({ message: 'Merci de saisir la taille de votre vélo.' });
        return;
    }

    // 4. Check address is not empty
    if (!address) {
        res.status(400).json({ message: 'Merci de donner la localisation de votre vélo.' });
        return;
    }

    const listOfAvailability = ["Oui", "Non"];
    // 5. Check availabilty belongs to Enum
    if (listOfAvailability.indexOf(availability) === -1){
        res.status(400).json({ message: 'Merci de nous indiquer si votre vélo est disponible à la location.' });
        return;
    }
    next();
}