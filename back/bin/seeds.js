const mongoose = require("mongoose");

const User = require("../models/Users");

mongoose.connect(`mongodb://localhost/back`, {
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