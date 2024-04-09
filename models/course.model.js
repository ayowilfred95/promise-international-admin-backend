const { DataTypes } = require("sequelize");
const sequelize = require("../database.js");
const students = require("./students.model");

const Course = sequelize.define("course", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  course_name: {
    type: DataTypes.STRING,
  },
  term: { 
    type: DataTypes.ENUM('first-term', 'second-term', 'third-term'), 
  },
  resumption_test:{
    type:DataTypes.INTEGER,
  },
  first_class_test: {
    type: DataTypes.INTEGER,
  },
  second_class_test: {
    type: DataTypes.INTEGER,
  },
  assignment: {
    type: DataTypes.INTEGER,
  },
  projects: {
    type: DataTypes.INTEGER,
  },
  mid_term_test: {
    type: DataTypes.INTEGER,
  },
  exam_score: {
    type: DataTypes.INTEGER,
  },
  total: {
    type: DataTypes.INTEGER,
  },
  average_mark: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  student_fullName: {
    type: DataTypes.STRING,
  },
  grade: {
    type: DataTypes.TEXT,
  },
  student_id: {
    type: DataTypes.UUID,
  },
});

students.hasMany(Course, {
  foreignKey: "student_id",
  as: "report",
});

Course.belongsTo(students, {
  foreignKey: "student_id",
  as: "student",
});

module.exports = Course;
