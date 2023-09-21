const {DataTypes} = require('sequelize')
const sequelize = require('../database.js')
const students = require('./students.model')

const Course = sequelize.define('course',{
     id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4
       },
      course_name: {
          type: DataTypes.STRING
      },
      test_score: {
          type: DataTypes.INTEGER
      },
      exam_score: {
         type: DataTypes.INTEGER
      },
      total: {
          type: DataTypes.INTEGER
      },
      student_fullName: {
          type: DataTypes.STRING
      },
      grade: {
          type: DataTypes.TEXT
      },
      student_id: {
          type: DataTypes.UUID
      }
})

students.hasMany(Course,{
     foreignKey: "student_id",
     as: 'report'
})

Course.belongsTo(students,{
     foreignKey: "student_id",
     as: 'student'
})

module.exports = Course;