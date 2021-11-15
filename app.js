require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const logger       = require('morgan');
const path         = require('path');

//Connection Database
require('./configs/db.config');

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();
require('./configs/session.config')(app);

require('./configs/passport.config')(app);

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Lien API / REACT
const cors = require('cors');
app.use(
  cors({
    credentials: true,
    origin: [process.env.REACT_URL]
  })
);

const authRoutes = require('./routes/auth.routes')
app.use('/',authRoutes)

const bikesRoutes = require('./routes/bikes.routes')
app.use('/', bikesRoutes)

const coursesRoutes = require('./routes/courses.routes')
app.use('/', coursesRoutes)

module.exports = app;