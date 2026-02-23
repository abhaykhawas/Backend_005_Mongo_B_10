const { createTeacher, getAllTeachers, getTeacherCourses, getTeacherStudents, register, login } = require('../controllers/teacherController');
const express = require('express')
const router = express.Router()


router.post('/', createTeacher)

router.get('/', getAllTeachers)

router.get('/:id/courses', getTeacherCourses)

router.get('/:id/students', getTeacherStudents)

router.post('/signup', register)

router.post('/login', login)

module.exports = router