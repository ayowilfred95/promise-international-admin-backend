const sequelize = require('../database');
const Course = require('../models/course.model');
const Student = require('../models/students.model')



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

      // Check if the student with the provided ID exists
      const existingStudent = await Student.findByPk(student_id);
      if (!existingStudent) {
          return res.status(404).json({
              status: 'failed',
              message: 'Student not found',
          });
      }


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
        data: report.toJSON(), // Convert the Sequelize model instance to a plain JavaScript object
     });
} catch (error) {
    res.status(400).json({
        status: 'failed',
        message: 'Error creating student report',
        error: error.message,
    })
}};


exports.getStudentReportById = async (req, res) => {
    try {
        const {id} = req.params;

        // Check if a student with the given ID exists
        const student = await Student.findByPk(id);

        if (!student) {
            return res.status(404).json({
                status: 'failed',
                message: 'Student not found',
            });
        }

        // Now that you have the student, you can retrieve their report
        const report = await Course.findOne({
            where: {
                student_id: id,
            },
        });

        if (!report || report.length === 0) {
            return res.status(404).json({
                status: 'failed',
                message: 'No reports found for the student',
            });
        }

        res.status(200).json({
            status: 'success',
            data: report,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            message: 'Internal server error',
        });
    }
};




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
