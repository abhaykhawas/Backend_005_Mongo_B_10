const Student = require('../models/Student')


const createStudent = async (req, res) => {
    try{
        const { name, age } = req.body
        const student = await Student.create({
            name,
            age
        })

        res.status(201).json(student)
    }
    catch(err) {
        res.status(400).json({err: err.message})
    }
}



module.exports = {
    createStudent
}