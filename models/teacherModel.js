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
        type: DataTypes.STRING,
        allowNull: false
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
    },
    phoneNumber: {
        type: DataTypes.STRING // Add phoneNumber field because the meet code doesnt have this field initially
    },
    country: {
        type: DataTypes.STRING, // Make country optional, remove allowNull or add allowNull is you required it
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
