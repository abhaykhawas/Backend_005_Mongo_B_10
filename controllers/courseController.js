const Course = require('../models/Course');
const Teacher = require('../models/Teacher');


const createCourse = async (req, res) => {
    try{
        const { title, duration, teacher } = req.body

        // check if teacher exists
        const teacherExists = await Teacher.findById(teacher)

        if(!teacherExists) return res.status(404).json({ message: "Teacher not found" });


        const course = await Course.create({
            title,
            duration,
            teacher
        })

        res.status(201).json(course)
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}


const getAllCourses = async (req, res) => {
    try{
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 3
        const skip = (page - 1) * limit

        const courses = await Course.find().skip(skip).limit(limit).populate('teacher')
        res.status(200).json(courses)
    }
    catch(err){
        res.status(400).json({ error : err.message })
    }
}


module.exports = { createCourse, getAllCourses }