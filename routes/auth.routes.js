const express = require("express");
const authRoutes = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/Users");

authRoutes.post("/signup", (req, res, next) => {
  
    const { username, password, email, age, height, level, avatar } = req.body;

  let role;
  if (email === "admin@admin.fr") {
    role = "admin";
  } else {
    role = "user";
  }
  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }
  if (password.length < 7) {
    res.status(400).json({
      message:
        "Please make your password at least 8 characters long for security purposes.",
    });
    return;
  }
  User.findOne({ username })
    .then((foundUser) => {
      if (foundUser) {
        res
          .status(400)
          .json({ message: "Username taken. Choose another one." });
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);
      
      const aNewUser = new User({
        username: username,
        passwordHash: hashPass,
        email: email,
      });

      aNewUser
        .save()
        .then(() => {
          // Persist our new user into session
          req.session.currentUser = aNewUser;
          res.status(200).json(aNewUser);
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ message: "Saving user to database went wrong." });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Username check went bad." });
    });
});

authRoutes.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        return next(new Error("No user with that username"));
      }
      // compareSync
      if (bcrypt.compareSync(password, user.passwordHash) !== true) {
        return next(new Error("Wrong credentials"));
      } else {
        req.session.currentUser = user;
        res.json(user);
      }
    })
    .catch(next);
});
authRoutes.post("/logout", (req, res, next) => {
  req.session.destroy();
  res.json({ message: "Your are now logged out." });
});
authRoutes.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.session.currentUser) {
    res.status(200).json(req.session.currentUser);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});
//EDIT
authRoutes.put("/edit/:id", (req, res, next) => {
  //console.log("editRoad")
  const { username, email, age, height, level } = req.body;
  const data = { username, email, age, height, level };
  const id = req.params.id;
  console.log("id: ", id);
  if (!req.session.currentUser) {
    res.status(401).json({ message: "You need to be logged in!" });
    return;
  }

  User.findByIdAndUpdate({ _id: id }, data, { new: true })
    .then((newUser) => {
      console.log("new user", newUser);
      res.status(200).json(newUser);
    })
    .catch(next);
});

authRoutes.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  const IdGame = User.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});

module.exports = authRoutes;
