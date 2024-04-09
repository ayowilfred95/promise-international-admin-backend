const Teacher = require('../models/teacherModel')
const JWT = require('jsonwebtoken')
const sequelize = require('../database')
const students = require('../models/students.model');
const bcrypt = require('bcrypt')
const AppError = require('../Error/app.error')

exports.registerTeacher = async (req,res) => {
    try {
   await sequelize.sync();
   const {firstName,lastName,email,password,className,phoneNumber,country} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (hashedPassword) {
      const teacher = await Teacher.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        className: className,
        phoneNumber: phoneNumber,
        country:country
      });

      res.status(201).json({
        status: "success",
        data: teacher,
      });
    }

} catch (error) {
    res.status(201).json({
        status: "status",
        data: error
    })
}
}



// get all tecahers

exports.getTeachers = async (req,res) => {
try {
    await sequelize.sync()
    const teacher = await Teacher.findAll();
    res.status(200).json({
        status: 'success',
        data: teacher
    })
} catch (error) {
    res.status(200).json({
        status: 'failed',
        data: error
    })
}
}


// get teacher by student
exports.getTeacherStudent = async (req,res) => {
    try {
        await sequelize.sync()
    const data = await Teacher.findAll({
        include: [{
        model: students,
       as: 'student'
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
res.status(400).json({
    status: "failed",
    data: error
})
}}

// update teacher by id

exports.updateTeacherById = async(req,res) => {
    try {
    const {id} = req.params
    const {firstName,lastName,email,className,phoneNumber,country} = req.body;
    const teacher = await Teacher.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        className: className,
        phoneNumber: phoneNumber,
        country: country
    },{
        where: {
            id: id
        }
    })
    res.status(200).json({
        status: 'success',
        data: teacher
    })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            data: error
        })
    }
}


// reset teacher password
exports.resetPassword = async (req,res) => {
    const {email,password} = req.body;
   try {
    await sequelize.sync()
    const teacher = await Teacher.findOne({
        where: {
            email: email
        }
    })
    if(teacher.email === email) {
         await Teacher.update({
            password: password
        },{
            where: {
                email: email
            }
        })
        res.status(201).json({
            status: "success",
            message: "password successfully changed"
        })
    }
   } catch (error) {
    res.status(400).json({
        status: "failed",
        error: "check email properly"
    })
   }
}

// delete teacher by id
exports.deleteTeacherById = async (req, res) => {
    const id = req.params.id;
    try {
        await sequelize.sync();

        await Teacher.destroy({
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
