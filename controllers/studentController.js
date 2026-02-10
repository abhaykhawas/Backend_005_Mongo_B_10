const Student = require('../models/Student')


const createStudent = async (req, res) => {
    try{
        const { name, age, course } = req.body
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
        const students = await Student.find()

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


module.exports = {
    createStudent, fetchAllStudent, fetchOneStudent, updateStudent, deleteStudent
}


// findOne, populate - Research
// Connect multiple connections - read