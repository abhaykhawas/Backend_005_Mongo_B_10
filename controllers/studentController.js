const Student = require('../models/Student')
const Course = require('../models/Course')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const createStudent = async (req, res) => {
    try{
        const { name, age, course } = req.body

        const courseExists = await Course.findById(course)

        if(!courseExists) return res.status(404).json({message: "Course not found!!!"})

        const student = await Student.create({
            name,
            age,
            course
        })

        res.status(201).json(student)
    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}


const fetchAllStudent = async (req, res) => {
    try{
        const students = await Student.find().populate('course')

        res.status(200).json({
            data: students,
            count: students.length
        })
    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}


const fetchOneStudent = async (req, res) => {
    try{
        const id = req.params.id
        const student = await Student.findById(id)

        if(!student) {
            return res.status(404).json({message: "Student not found"})
        }

        res.status(200).json(student)

    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}


const updateStudent = async (req, res) => {
    try{
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new : true}
        )

        if(!updatedStudent) {
            return res.status(404).json({message: "Student not found"})
        }

        res.status(200).json(updatedStudent)
    }
    catch(err){
        res.status(400).json({err: err.message})
    }
}


const deleteStudent = async (req, res) => {
    try{
        const deletedStudent = await Student.findByIdAndDelete(req.params.id)

        if(!deletedStudent) {
            res.status(404).json({ message: "Student not found" })
        }

        res.status(200).json({
            message: "Student is deleted successfully"
        })
    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}


const register = async (req, res) => {
    try{
        const { name, age, course, email, password } = req.body

        const courseExists = await Course.findById(course)

        if(!courseExists) return res.status(404).json({message: "Course not found!!!"});

        const existingStudent = await Student.findOne({email})

        if(existingStudent) return res.status(200).json({message : "Student exists"});

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const student = await Student.create({
            name,
            age,
            course,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            { id: student._id },
            "super-secret",
            { expiresIn: "2m" }
        )

        res.status(201).json({student, token})

    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}


module.exports = {
    createStudent, fetchAllStudent, fetchOneStudent, updateStudent, deleteStudent, register
}


// findOne, populate - Research
// Connect multiple connections - read