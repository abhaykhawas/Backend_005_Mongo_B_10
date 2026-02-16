const { createCourse, getAllCourses } = require('../controllers/courseController');
const express = require('express')
const router = express.Router()


router.post('/', createCourse)
router.get('/', getAllCourses)

module.exports = router