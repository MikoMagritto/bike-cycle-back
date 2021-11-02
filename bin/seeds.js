const mongoose = require("mongoose");

const User = require("../models/User.model");

mongoose.connect(`mongodb+srv://admin:admin@cluster0.vup2r.mongodb.net/myBicycle`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => { console.log("victoire") })
  .catch((err) => console.log(err));

  const user = {
      username : "Michel"
  }

  User.insertMany(user)
  .then(function (usersFromDB) {
    console.log(`${usersFromDB.length} créés en base`);
  })
  .catch((err) => console.log(err));