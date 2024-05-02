const {createStudentReportById, getAllStudentReport, updateStudentReport, deleteCourseById,getStudentReportById,getStudentAverageCourseById,assignCourseToTeacher,getCoursesForTeacher,getStudentCoursesByTerm,deleteCourseAssignToTeacher,getStudentPositionByTermAndId,getAllStudentsAverageMarkByClassName } = require('../controllers/course.controller')
const express = require('express');
const { getStudentReport, getStudentCourses} = require('../controllers/students.controllers');

const router = express.Router()

router.route('/').post(createStudentReportById).get(getAllStudentReport)
router.route('/student/report').get(getStudentReport)
router.route('/update/student/report').put(updateStudentReport)
router.route('/student/courses/:id').get(getStudentCourses)
router.route('/:id').delete(deleteCourseById)
router.route('/student/report/:id').get(getStudentReportById)
router.route('/student/courses/average/:id/:term').get(getStudentAverageCourseById)
router.route('/student/courses/position/:id/:term/:className').get(getStudentPositionByTermAndId)
router.route('/teacher/course/subject').post(assignCourseToTeacher)
// router.route('/teacher/course/:courseName').get(getAssignTeacher)
router.route('/teacher/course/courses/:teacherId').get(getCoursesForTeacher)
router.route('/:studentId/:term').get(getStudentCoursesByTerm)
router.route('/:teacherId/:courseSubject').delete(deleteCourseAssignToTeacher)
router.route("/:className/:term").get(getAllStudentsAverageMarkByClassName)



module.exports = router;
