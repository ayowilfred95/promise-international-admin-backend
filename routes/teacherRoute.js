const express = require('express');
const { registerTeacher, getTeacherStudent, getTeachers, deleteTeacherById, updateTeacherById } = require('../controllers/teacherAuth.controller');

const router = express.Router()

router.route('/register').post(registerTeacher)
router.route('/').get(getTeachers)
//router.route('/login').post(loginTeacher)
router.route('/getTeacherStudents/:id').get(getTeacherStudent)
router.route('/:id').put(updateTeacherById)
// delete route for teacher
router.route('/:id').delete(deleteTeacherById)
module.exports = router;
