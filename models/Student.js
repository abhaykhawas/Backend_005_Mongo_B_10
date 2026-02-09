const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    course: {
        type: String,
        default: "Full stack"
    },

    isActive: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model("Student", studentSchema)