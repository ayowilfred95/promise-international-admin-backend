const students = require("../models/students.model");
const Teacher = require("../models/teacherModel");
const sequelize = require("../database.js");
const AppError = require("../Error/app.error");
const Course = require("../models/course.model");



async function getNextClassSequentialNumber(className) {
    // Fetch the current class sequential number from the database
    const result = await students.findOne({
        where: {
            className: className,
        },
        attributes: ['classSequentialNumber'],
        order: [['classSequentialNumber', 'DESC']],
    });

    return result ? result.classSequentialNumber + 1 : 1;
}

async function incrementClassSequentialNumber(className) {
    // Increment the class sequential number in the database
    await students.increment('classSequentialNumber', {
        where: {
            className: className,
        },
    });
}


function generateMatriculationNumber(className, classSequentialNumber) {
    return `PIS${className}-${classSequentialNumber.toString().padStart(4, '0')}`;
}

exports.create = async (req, res, next) => {
  try {
    await sequelize.sync();

      // Fetch the current class sequential number for the given class
      const currentClass = req.body.className;
      const classSequentialNumber = await getNextClassSequentialNumber(currentClass);

       // Increment the class sequential number for the next student in the class
       await incrementClassSequentialNumber(currentClass);


          // Combine the unique identifier with the class and sequential number
          const matriculationNumber = generateMatriculationNumber(currentClass, classSequentialNumber);


    const student = await students.create({
      matriculationNumber: matriculationNumber,
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
      teacher_id: req.body.teacher_id,
    });

    res.status(201).json({
      status: "success",
      data: student,
    });
  } catch (error) {
    next(new AppError(error, 400));
  }
};

// Handler to allow students login into their portal with matriculation number and surname as password
exports.login = async(req,res,next)=>{
    try{
        await sequelize.sync();
        const { matriculationNumber, surname } = req.body;

           // Check if a student with the given matriculation number and surname exists
           const student = await students.findOne({
            where: {
                matriculationNumber: matriculationNumber,
                surname: surname,
            },
        });

        if (!student) {
            throw new AppError("Invalid matriculation number or surname", 401);
        }
        res.status(200).json({
            status: "success",
            message: "Login successful",
            data: {
                studentId: student.id,
                matriculationNumber: student.matriculationNumber,
            },
        });

}catch(error){
    next(new AppError(error.message, error.statusCode || 400));
}
}
    





exports.getAll = async (req, res) => {
  try {
    await sequelize.sync();

    const student = await students.findAll();
    res.status(200).json({
      status: "success",
      data: student,
    });
  } catch (error) {
    next(new AppError(error, 400));
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
    next(new AppError(error, 400));
  }
};

exports.updateOneById = async (req, res,next) => {
  const id = req.params.id;
  try {
    await sequelize.sync();

      // Fetch the current class sequential number for the given class
      const currentClass = req.body.className;
      const classSequentialNumber = await getNextClassSequentialNumber(currentClass);

      // Increment the class sequential number for the next student in the class
      await incrementClassSequentialNumber(currentClass);

      // Combine the unique identifier with the class and sequential number
      const matriculationNumber = generateMatriculationNumber(currentClass, classSequentialNumber);
         // Find the student by ID
    const student = await students.findByPk(id);

    if (!student) {
        return res.status(404).json({
          status: 'failed',
          message: 'No student found with the provided ID',
        });
      }

     // Update the student
     const updatedStudent = await student.update({
        matriculationNumber: matriculationNumber,
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
        teacher_id: req.body.teacher_id,
      });

    res.status(200).json({
      status: "success",
      data: updatedStudent,
    });
  } catch (error) {
    next(new AppError(error, 400));
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
    next(new AppError(error, 400));
  }
};

exports.getStudentReport = async (req, res,next) => {
  try {
    const student = await students.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (student) {
      const data = await students.findAll({
        include: [
          {
            model: Course,
            as: "report",
          },
        ],
        where: {
          id: student.id,
        },
      });

      res.status(200).json({
        status: "success",
        data: data,
      });
    }
  } catch (error) {
    next(new AppError(error, 400));
  }
};

exports.getStudentCourses = async (req, res,next) => {
  try {
    const data = await students.findAll({
      include: [
        {
          model: Course,
          as: "report",
        },
      ],
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      data: data,
    });
  } catch (error) {
    next(new AppError(error, 400));
  }
};

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


exports.markStudentsAttendance=async(req,res) =>{
  try{
    const{id} = req.params.id
  }catch(error){

  }
}



