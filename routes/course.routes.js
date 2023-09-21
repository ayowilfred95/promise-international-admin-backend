const {createStudentReportById, getAllStudentReport, updateStudentReport, deleteCourseById, } = require('../controllers/course.controller')
const express = require('express');
const { getStudentReport, getStudentCourses } = require('../controllers/students.controllers');

const router = express.Router()

router.route('/').post(createStudentReportById).get(getAllStudentReport)
router.route('/student/report').get(getStudentReport)
router.route('/update/student/report').put(updateStudentReport)
router.route('/student/courses/:id').get(getStudentCourses)
router.route('/:id').delete(deleteCourseById)


module.exports = router;