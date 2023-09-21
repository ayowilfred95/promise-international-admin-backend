const Teacher = require('../models/teacherModel')
const JWT = require('jsonwebtoken')
const sequelize = require('../database')
const students = require('../models/students.model');
const bcrypt = require('bcrypt')

exports.resgisterTeacher = async (req,res) => {
    try {
   await sequelize.sync();
   const {firstName,lastName,email,password,className} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    if (hashedPassword) {
      const teacher = await Teacher.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        className: className
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


exports.loginTeacher = async (req,res) => {
    try {
        await sequelize.sync()
        const { email,password } = req.body
        const teacher = await Teacher.findOne({
            where: {
                email: email
            }
        })
        
        const decryptedPassword = await bcrypt.compare(password, teacher.password);
        
        if(decryptedPassword) {

            const accessToken = JWT.sign(
                {
                  isAdmin: teacher.isAdmin,
                  id: teacher.id,
                  email: teacher.email
                },
                process.env.JWT_SEC,
                { expiresIn: "1d" }
              );

         res.status(200).json({
            status: 'success',
            data: teacher,
            token: accessToken
           })
        }else {
            res.status(400).json({
                status: 'failed',
                message: 'email or password may be incorrect'
            })
        }

    } catch (error) {
        res.status(400).json({
            status: "failed",
            data: error
        })
    }
}


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


exports.updateTeacherById = async(req,res) => {
    try {
    const {id} = req.params
    const {firstName,lastName,email,className} = req.body;
    const teacher = await Teacher.update({
        firstName: firstName,
        lastName: lastName,
        email: email,
        className: className
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