const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

module.exports = app => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 6000000 // 60 * 1000 ms === 1 min
      },
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
        // ttl => time to live
       ttl: 60 * 60 * 24 // 60sec * 60min * 24h => 1 day
      })
    })
  );
};