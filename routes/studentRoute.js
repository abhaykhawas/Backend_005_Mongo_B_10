const { createStudent, fetchAllStudent, fetchOneStudent, updateStudent, deleteStudent } = require('../controllers/studentController')
const express = require('express')
const router = express.Router()


router.post('/', createStudent)

router.get('/', fetchAllStudent)

router.get('/:id', fetchOneStudent)

router.put('/:id', updateStudent)

router.delete('/:id', deleteStudent)

module.exports = router