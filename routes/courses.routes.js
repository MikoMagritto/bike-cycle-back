const express = require("express");
const courseRoutes = express.Router();
const courseController = require('../controllers/courseController');
const { ensureAuthenticated } = require('../middleware/ensureAuthenticated');
const { ensureObjectIdIsValid } = require('../middleware/ensureObjectIdIsValid');

//-------- COURSE CREATION ------------
courseRoutes.post('/courses', ensureAuthenticated, courseController.createCourse);

//-------- GET COURSE DETAILS ------------
courseRoutes.get('/courses/:id', ensureAuthenticated, ensureObjectIdIsValid, courseController.getCourseDetails);

//-------- GET CALL OURSES DETAILS ------------
courseRoutes.get('/courses', ensureAuthenticated, courseController.getAllCoursesDetails);

module.exports = courseRoutes;