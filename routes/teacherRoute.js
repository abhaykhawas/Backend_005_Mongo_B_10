const { createTeacher, getAllTeachers, getTeacherCourses, getTeacherStudents } = require('../controllers/teacherController');
const express = require('express')
const router = express.Router()


router.post('/', createTeacher)

router.get('/', getAllTeachers)

router.get('/:id/courses', getTeacherCourses)

router.get('/:id/students', getTeacherStudents)


module.exports = router