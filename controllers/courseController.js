const Course = require("../models/Course.model");

//-------- COURSE CREATION ------------
module.exports.createCourse = (req, res) => {

    const { usedBike, startPosition, endPosition } = req.body;

    const newCourse = new Course({
        usedBike: usedBike,
        courseOwner: req.user.id,
        startPosition: startPosition,
        endPosition: endPosition
    })

    newCourse.save()
        .then(() => {
            res.status(201).json({ course: newCourse })
        })
        .catch(err => {
            res.status(400).json({ message: err });
        });

}

//-------- GET COURSE DETAILS ------------
module.exports.getCourseDetails = (req, res) => {

    Course.findById(req.params.id)
        .populate('usedBike')
        .populate('courseOwner')
        .then(courseFromDB => {
            res.status(200).json({ course: courseFromDB })
        })
        .catch(err => {
            res.status(400).json({ message: err });
        });

}

//-------- GET CALL OURSES DETAILS ------------
module.exports.getAllCoursesDetails = (req, res) => {

    Course.find()
        .populate('usedBike')
        .populate('courseOwner')
        .then(coursesFromDB => {
            res.status(200).json({ courses: coursesFromDB })
        })
        .catch(err => {
            res.status(400).json({ message: err });
        });
}