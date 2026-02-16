const { createTeacher, getAllTeachers } = require('../controllers/teacherController');
const express = require('express')
const router = express.Router()


router.post('/', createTeacher)

router.get('/', getAllTeachers)


module.exports = router