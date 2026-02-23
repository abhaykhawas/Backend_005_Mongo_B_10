const { createStudent, fetchAllStudent, fetchOneStudent, updateStudent, deleteStudent, register, login } = require('../controllers/studentController')
const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const teacherMiddleware = require('../middleware/teacherMiddleware')

const router = express.Router()


router.post('/', createStudent)

router.get('/',authMiddleware, teacherMiddleware ,fetchAllStudent)

router.get('/:id', fetchOneStudent)

router.put('/', authMiddleware ,updateStudent)

router.delete('/:id', deleteStudent)

router.post('/signup', register)

router.post('/login', login)

module.exports = router