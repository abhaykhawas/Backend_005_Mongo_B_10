const Teacher = require('../models/Teacher');
const Course = require('../models/Course')
const Student = require('../models/Student')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

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


const register = async (req, res) => {
    try{
        const { name, email, expertise, experience, password } = req.body;

        const teacher = await Teacher.findOne({email})

        if(teacher) return res.status(400).json({message: "User already exists"});

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newTeacher = await Teacher.create({
            name, email, expertise, experience, password: hashedPassword
        })

        const token = jwt.sign(
            { id: newTeacher._id, type: 'teacher' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({ token })
    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}


const login = async(req, res) => {
    try{
        const { email, password } = req.body;

        const teacher = await Teacher.findOne({email});

        if(!teacher) return res.status(404).json({message: "teacher does not exists please signup"});

        const isCompare = await bcrypt.compare(password, teacher.password);

        if(!isCompare) return res.status(401).json({message: "Invalid credentials!!!"});

        const token = jwt.sign(
            { id: teacher._id, type: 'teacher' },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({ token })

    }
    catch(err){
        res.status(400).json({ error: err.message })
    }
}

module.exports = { createTeacher, getAllTeachers, getTeacherCourses, getTeacherStudents, register, login }