const mongoose = require("mongoose");

module.exports.ensureObjectIdIsValid = (req, res, next) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Specified id is not valid" });;
    } else {
        return next();
    }
}