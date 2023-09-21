const { DataTypes } = require('sequelize')
const sequelize = require('../database')
const students = require('./students.model')

const Teacher = sequelize.define('teachers', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
     },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    className: {
        type: DataTypes.STRING
    }
})

Teacher.hasMany(students, {
    foreignKey: 'teacher_id',
    as: 'student'
})

students.belongsTo(Teacher, {
    foreignKey: 'teacher_id',
    as: 'teacher'
})


module.exports = Teacher;