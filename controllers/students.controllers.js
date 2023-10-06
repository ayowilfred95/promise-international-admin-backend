const students = require("../models/students.model");
const Teacher = require('../models/teacherModel')
const sequelize = require("../database.js");
const AppError = require('../Error/app.error')
const Course = require("../models/course.model");

exports.create = async (req, res,next) => {
    try {
        await sequelize.sync();
        const student = await students.create({
            surname: req.body.surname,
            firstName: req.body.firstName,
            DOB: req.body.DOB,
            LGA: req.body.LGA,
            state: req.body.state,
            nameOfParent: req.body.nameOfParent,
            phoneNumber: req.body.phoneNumber,
            yearOfAdmission: req.body.yearOfAdmission,
            email: req.body.email,
            previousClass: req.body.previousClass,
            className: req.body.className,
            teacher_id: req.body.teacher_id
        });

        res.status(201).json({
            status: "success",
            data: student,
        });
    } catch (error) {
        next(new AppError(error,400))
    }
};

exports.getAll = async (req, res) => {
    try {
        await sequelize.sync();

        const student = await students.findAll();
        res.status(200).json({
            status: "success",
            data: student,
        });
    } catch (error) {
        next(new AppError(error,400))
    }
};

exports.getOneById = async (req, res) => {
    const id = req.params.id;
    try {
        await sequelize.sync();
        const student = await students.findOne({
            where: {
                id: id,
            },
        });
        res.status(200).json({
            status: "success",
            data: student,
        });
    } catch (error) {
        next(new AppError(error,400))
    }
};

exports.updateOneById = async (req, res) => {
    const id = req.params.id; 
    try {
        await sequelize.sync();
        const student = await students.update(
            {
                surName: req.body.surName,
                firstName: req.body.firstName,
                DOB: req.body.DOB,
                LGA: req.body.LGA,
                state: req.body.state,
                nameOfParent: req.body.nameOfParent,
                phoneNumber: req.body.phoneNumber,
                yearOfAdmission: req.body.yearOfAdmission,
                email: req.body.email,
                previousClass: req.body.previousClass,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        res.status(200).json({
            status: "success",
            data: student,
        });
    } catch (error) {
        next(new AppError(error,400))
        
    }
};

exports.deleteOneById = async (req, res) => {
    const id = req.params.id;
    try {
        await sequelize.sync();

        await students.destroy({
            where: {
                id: id,
            },
        });
        res.status(200).json({
            status: "success",
            data: null,
        });
    } catch (error) {
        next(new AppError(error,400))   
    }
};

exports.getStudentReport = async(req,res) => {
  try {
    const student = await students.findOne({
        where: {
            email: req.body.email
        }
    })

    if(student) {
        const data = await students.findAll({
            include: [{
                model: Course,
                as: 'report'
            }],
            where: {
                id: student.id
            }
        })
    
        res.status(200).json({
            status: "success",
            data: data
        })
    }
  } catch (error) {
    next(new AppError(error,400))
  }
}


exports.getStudentCourses = async(req,res) => {
try {
    const data = await students.findAll({
        include: [{ 
            model: Course,
            as: 'report'
        }],
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({
        status: "success",
        data: data
    })
} catch (error) {
    next(new AppError(error,400))
}
}


// Define the function to get students by teacher
exports.getStudentsByTeacher = async (req, res, next) => {
    try {
        const id = req.params.id; // Assuming you pass the teacherId as a route parameter
  
      await sequelize.sync();
  
      // Use Sequelize to find the teacher by ID
      const teacher = await Teacher.findByPk(id);
  
      if (!teacher) {
        return res.status(404).json({
          status: "error",
          message: "Teacher not found",
        });
      }
  
      // Use Sequelize to find students associated with the teacher
      const studentsOfTeacher = await students.findAll({
        where: {
          teacher_id: id,
        },
      });
  
      res.status(200).json({
        status: "success",
        data: studentsOfTeacher,
      });
    } catch (error) {
      next(new AppError(error, 400));
    }
  };
