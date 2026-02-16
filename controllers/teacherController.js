const Teacher = require('../models/Teacher');

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


// /api/teacher/:id/students (Get all students under a teacher)


module.exports = { createTeacher, getAllTeachers }