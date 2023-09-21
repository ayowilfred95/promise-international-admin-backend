const express = require('express');
const { resgisterTeacher, loginTeacher, getTeacherStudent, getTeachers, deleteTeacherById, updateTeacherById } = require('../controllers/teacherAuth.controller');

const router = express.Router()

router.route('/register').post(resgisterTeacher)
router.route('/').get(getTeachers)
router.route('/login').post(loginTeacher)
router.route('/getTeacherStudents/:id').get(getTeacherStudent)
router.route('/:id').put(updateTeacherById)
module.exports = router;