const {DataTypes} = require('sequelize')
const sequelize = require('../database.js');


const students = sequelize.define('student',{
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
     },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DOB: {
        type: DataTypes.STRING,
    },
    LGA: {
        type: DataTypes.STRING,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    yearOfAdmission: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    previousClass: {
        type: DataTypes.STRING,
    },
    teacher_id: {
        // Use the same data type as in the Tecaher model
        /**
         * @dev This little buy {INTEGER} caused the prod to be down
         */
        type: DataTypes.UUID,
        required: true,
        allowNull: false
    }
})




module.exports = students;
