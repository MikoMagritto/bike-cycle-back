module.exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        // The user is authenticated
        // and we have access to the logged user in req.user
        return next();
    } else {
        res.status(403).json({message:'not authorized'});
    }
}