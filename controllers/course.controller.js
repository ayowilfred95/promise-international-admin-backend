const sequelize = require('../database');
const Course = require('../models/course.model');



exports.createStudentReportById = async(req,res) => {
  try {
    await sequelize.sync()
    const {
        course_name,
        test_score,
        exam_score,
        grade,
        total,
        student_fullName,
        student_id
    } = req.body;
     const report = await Course.create({
       course_name: course_name,
       test_score: test_score,
       exam_score: exam_score,
       grade: grade,
       total: total,
       student_fullName: student_fullName,
       student_id: student_id
     })
     res.status(201).json({
        status: 'success',
        data: report
     })
} catch (error) {
    res.status(400).json({
        status: 'failed',
        data: error
    })
}};



exports.getAllStudentReport = async(req,res) => {
try {
    const courses = await Course.findAll()
    
    res.status(200).json({
        status: 'success',
        data: courses
    })
} catch (error) {
    res.status(400).json({
        status: "failed",
        data: error
    })
}
}

exports.updateStudentReport = async(req,res) => {
try {
    const {
        test_score,
        exam_score,
        grade,
        total,
        id
    } = req.body;
    
    const course = await Course.update({
        test_score: test_score,
        exam_score: exam_score,
        grade: grade,
        total: total
    },{
        where: {
            id: id
        }
    })

    res.status(200).json(course)
} catch (error) {
    res.status(400).json({
        status: 'failed',
        data: error
    })
}
}


exports.deleteCourseById = async(req,res) => {
try {
    const {id} = req.params;
    await Course.destroy({
        where: {
            id: id
        }
    })
    res.status(200).json({
        status: 'success',
        message: 'course deleted successfully'
    })
} catch (error) {
    res.status(400).json({
        status: 'failed',
        data: error
    })
}
}