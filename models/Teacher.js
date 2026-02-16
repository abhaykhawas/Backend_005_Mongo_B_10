const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    }
}, {timestamps: true})


module.exports = mongoose.model("Teacher", teacherSchema)