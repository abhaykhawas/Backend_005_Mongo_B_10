const Teacher = require('../models/Teacher');
const Course = require('../models/Course')
const Student = require('../models/Student')

const createTeacher = async (req, res) => {
    try{
        const teacher = await Teacher.create(req.body)
        res.status(201).json(teacher)
    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}


const  getAllTeachers = async (req, res) => {
    try{
        const teachers = await Teacher.find()
        res.status(200).json(teachers)
    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
}


// /api/teacher/:id/courses (Get all courses under a teacher)
const getTeacherCourses = async (req, res) => {
    try{
        const courses = await Course.find({ teacher: req.params.id })
        res.status(200).json(courses)
    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}

// /api/teacher/:id/students (Get all students under a teacher)
const getTeacherStudents = async (req, res) => {
    try{
        const courses = await Course.find({ teacher: req.params.id })

        const courseIds = courses.map( course => course._id )

        const students = await Student.find({
            course: { $in: courseIds }
        }).populate("course")

        res.status(200).json(students)

    }
    catch(err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { createTeacher, getAllTeachers, getTeacherCourses, getTeacherStudents }