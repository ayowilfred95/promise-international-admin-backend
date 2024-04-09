const sequelize = require("../database");
const Course = require("../models/course.model");
const Student = require("../models/students.model");
const courseNames = require("../utils/courses");
const Teacher = require("../models/teacherModel");

exports.createStudentReportById = async (req, res) => {
  try {
    await sequelize.sync();
    const {
      course_name,
      term,
      first_class_test,
      resumption_test,
      second_class_test,
      assignment,
      projects,
      mid_term_test,
      exam_score,
      grade,
      student_fullName,
      student_id,
    } = req.body;

    if (!term) {
      return res.status(404).json({
        status: "failed",
        message:
          " Please input the term in this format: first-term or second-term or third-term",
      });
    }

    // const teacher = await Teacher.findByPk(teacher_id);

    // if (!teacher) {
    //   return res.status(404).json({
    //     status: "failed",
    //     message: "Teacher not found",
    //   });
    // }

    // // Check if the teacher has any courses assigned
    // if (!teacher.course_subject.includes(course_name)) {
    //   return res.status(400).json({
    //     status: "Failed",
    //     message: "Course is not assigned to this teacher",
    //   });
    // }

    // Check if the student with the provided ID exists
    const existingStudent = await Student.findByPk(student_id);
    if (!existingStudent) {
      return res.status(404).json({
        status: "failed",
        message: "Student not found",
      });
    }

    console.log("Existing student:", existingStudent);

    // Calculate the total based on exam_score and test_score
    const parsedExamScore = parseFloat(exam_score);
    const parsedTestScore = parseFloat(mid_term_test);
    const parsedResumptionTestScore = parseFloat(resumption_test);
    const parsedFirstTestScore = parseFloat(first_class_test);
    const parsedSecondTestScore = parseFloat(second_class_test);
    const parsedProject = parseFloat(projects);
    const parseAssignment = parseFloat(assignment);

    if (
      isNaN(parsedExamScore) ||
      isNaN(parsedTestScore) ||
      isNaN(parsedFirstTestScore) ||
      isNaN(parsedSecondTestScore) ||
      isNaN(parsedProject) ||
      isNaN(parsedResumptionTestScore) ||
      isNaN(parseAssignment)
    ) {
      return res.status(400).json({
        status: "failed",
        message:
          " Please provide valid exam_score or test_score or assignment_score or resumption_score",
      });
    }

    const total =
      parsedExamScore +
      parsedTestScore +
      parsedFirstTestScore +
      parsedResumptionTestScore +
      parsedSecondTestScore +
      parsedProject +
      parseAssignment;

    console.log("Total is:", total);

    const report = await Course.create({
      course_name: course_name,
      term: term,
      first_class_test: first_class_test,
      second_class_test: second_class_test,
      resumption_test: resumption_test,
      assignment: assignment,
      projects: projects,
      mid_term_test: mid_term_test,
      exam_score: exam_score,
      grade: grade,
      total: total,
      student_fullName: student_fullName,
      student_id: student_id,
      // teacher_id: teacher_id,
    });
    res.status(201).json({
      status: "success",
      data: report.toJSON(), // Convert the Sequelize model instance to a plain JavaScript object
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Error creating student report",
      error: error.message,
    });
  }
};

exports.getStudentAverageCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if a student with the given ID exists
    const student = await Student.findByPk(id, {
      include: { model: Course, as: "report" }, // Include associated courses
    });

    if (!student) {
      return res.status(404).json({
        status: "failed",
        message: "Student not found",
      });
    }

    // Extract courses from the student object
    const courses = student.report;

    // Calculate the average course score
    const totalScores = courses.map((course) => course.total);
    const sumTotalScores = totalScores.reduce((acc, total) => acc + total, 0);
    const averageMark = sumTotalScores / courses.length;

     // Update the average_mark field in the database
     await Course.update({ average_mark: averageMark }, {
      where: { student_id: id } 
    });

    res.status(200).json({
      status: "success",
      data: {
        // student: student.toJSON(),
        averageCourseScore: averageMark
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Error retrieving student or calculating average course score",
      error: error.message,
    });
  }
};






exports.getStudentReportById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if a student with the given ID exists
    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({
        status: "failed",
        message: "Student not found",
      });
    }

    // Now that you have the student, you can retrieve their report
    const report = await Course.findOne({
      where: {
        student_id: id,
      },
    });

    res.status(200).json({
      status: "success",
      data: report,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
    });
  }
};

exports.getAllStudentReport = async (req, res) => {
  try {
    const courses = await Course.findAll();

    res.status(200).json({
      status: "success",
      data: courses,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: error,
    });
  }
};

exports.updateStudentReport = async (req, res) => {
  try {
    const { test_score, exam_score, grade, total, id } = req.body;

    const course = await Course.update(
      {
        test_score: test_score,
        exam_score: exam_score,
        grade: grade,
        total: total,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: error,
    });
  }
};

exports.deleteCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.destroy({
      where: {
        id: id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "course deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: error,
    });
  }
};

exports.assignCourseToTeacher = async (req, res) => {
  try {
    const { teacherId, courseSubject } = req.body;

    // Find the teacher
    const teacher = await Teacher.findByPk(teacherId);
    if (!teacher) {
      return res.status(404).json({
        status: "failed",
        message: "Teacher not found",
      });
    }

    if (!courseNames.includes(courseSubject)) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid course name",
      });
    }

    console.log(
      "Current teacher's course subjects (before):",
      teacher.course_subject
    );

    // Ensure teacher.course_subject is initialized as an array
    if (!Array.isArray(teacher.course_subject)) {
      console.log("Initializing course_subject as an empty array");
      teacher.course_subject = [];
    }

    console.log(
      "Appending courseSubject to teacher's course_subject array:",
      courseSubject
    );

    // // Concatenate the existing course subjects array with the new course subject
    teacher.course_subject = teacher.course_subject.concat(courseSubject);

    // teacher.course_subject.push(courseSubject);

    // Save the updated teacher object
    await teacher.save();

    console.log(
      "Serialized course subjects (after saving):",
      teacher.course_subject
    );

    res.status(201).json({
      status: "success",
      message: "Course assigned to teacher successfully",
      teacherId: teacher.id,
      course: teacher.course_subject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get courses assigned to teachers
exports.getCoursesForTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    // Find the teacher
    const teacher = await Teacher.findByPk(teacherId);

    if (!teacher) {
      return res.status(404).json({
        status: "failed",
        message: "Teacher not found",
      });
    }

    // Check if the teacher has any courses assigned
    if (!teacher.course_subject || teacher.course_subject.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No courses found for this teacher",
      });
    }

    // Return the list of courses assigned to the teacher
    return res.status(200).json({
      status: "success",
      message: "Courses found for the teacher",
      courses: teacher.course_subject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};

// get students course by term
exports.getStudentCoursesByTerm = async (req, res) => {
  try {
    const { studentId, term } = req.params; // Assuming you pass studentId and term as route parameters

    // Find all courses for the specified student and term
    const courses = await Course.findAll({
      where: {
        student_id: studentId,
        term: term,
      },
    });

    res.status(200).json({
      status: "success",
      data: courses,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Error retrieving student courses",
      error: error.message,
    });
  }
};


// Delete a course subject assigned to a teacher
exports.deleteCourseAssignToTeacher = async (req, res) => {
  try {
    const { teacherId, courseSubject } = req.params;

    const teacher = await Teacher.findByPk(teacherId);

    // Remove the courseSubject from the teacher's assigned courses
    teacher.course_subject = teacher.course_subject.filter(course => course !== courseSubject);

    await teacher.save();

    res.status(200).json({
      status: "success",
      message: `Course deleted  for ${teacher.firstName} successfully`,
      course: teacher.course_subject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Internal server error",
      error: error.message,
    });
  }
}





// exports.getStudentPositionByTermAndId = async (req, res) => {
//   try {
//     const { id, term } = req.params;

//     // Fetch all students' average marks for the specified term
//     const students = await Student.findAll({
//       include: { 
//         model: Course, 
//         as: "report", 
//         where: { term: term },
//         attributes: ['student_id', [sequelize.fn('AVG', sequelize.col('total')), 'average_mark']] // Calculate average marks
//       },
//       group: ['student.id', 'report.id'], // Group by both student id and report id
//       order: [[sequelize.literal('average_mark'), 'DESC']] // Sort by average mark in descending order
//     });

//     if (!students || students.length === 0) {
//       return res.status(404).json({
//         status: "failed",
//         message: "No students found for the specified term",
//       });
//     }

//     // Map the students array to extract student IDs and average scores
//     const studentScores = students.map(student => ({
//       student_id: student.id,
//       average_score: student.dataValues.report[0].dataValues.average_mark // Access the average mark from the report
//     }));

//     // Sort the student scores array based on the average scores in descending order
//     studentScores.sort((a, b) => b.average_score - a.average_score);

//      // Find the position of the specified student ID in the sorted list
//      let position = 0;
//      for (let i = 0; i < studentScores.length; i++) {
//        if (studentScores[i].student_id === id) {
//          position = i + 1;
//          break;
//        }
//      }

//     res.status(200).json({
//       status: "success",
//       // data: studentScores,
//       position: position
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "failed",
//       message: "Error retrieving students or calculating position by term",
//       error: error.message,
//     });
//   }
// };






exports.getStudentPositionByTermAndId = async (req, res) => {
  try {
    const { id, term, className } = req.params; // Assuming className is passed as a parameter

    // Fetch all students' average marks for the specified term and className
    const students = await Student.findAll({
      where: { className: className }, // Filter by className
      include: { 
        model: Course, 
        as: "report", 
        where: { term: term },
        attributes: ['student_id', [sequelize.fn('AVG', sequelize.col('total')), 'average_mark']] // Calculate average marks
      },
      group: ['student.id', 'report.id'], // Group by both student id and report id
      order: [[sequelize.literal('average_mark'), 'DESC']] // Sort by average mark in descending order
    });

    if (!students || students.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No students found for the specified term and class",
      });
    }

    // Map the students array to extract student IDs and average scores
    const studentScores = students.map(student => ({
      student_id: student.id,
      average_score: student.dataValues.report[0].dataValues.average_mark // Access the average mark from the report
    }));

    // Sort the student scores array based on the average scores in descending order
    studentScores.sort((a, b) => b.average_score - a.average_score);

    // Find the position of the specified student ID in the sorted list
    let position = 0;
    for (let i = 0; i < studentScores.length; i++) {
      if (studentScores[i].student_id === id) {
        position = i + 1;
        break;
      }
    }

    res.status(200).json({
      status: "success",
      // data: studentScores,
      position: position
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Error retrieving students or calculating position by term and class",
      error: error.message,
    });
  }
};




exports.getAllStudentsAverageMarkByClassName = async (req, res) => {
  try {
    const { className } = req.params;

    // Find all students in the given class
    const students = await Student.findAll({
      where: { className: className },
      include: { model: Course, as: "report" } // Include associated courses
    });

    if (!students || students.length === 0) {
      return res.status(404).json({
        status: "failed",
        message: "No students found in the specified class",
      });
    }

    // Calculate the average mark for each student
    const studentsAverageMarks = students.map(student => {
      const courses = student.report;
      const totalScores = courses.map(course => course.total);
      const sumTotalScores = totalScores.reduce((acc, total) => acc + total, 0);
      const averageMark = sumTotalScores / courses.length;
      return {
        studentId: student.id,
        studentName: student.name, // Assuming there's a 'name' field in the Student model
        averageMark: averageMark
      };
    });

    res.status(200).json({
      status: "success",
      data: studentsAverageMarks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Error retrieving students or calculating average marks by class",
      error: error.message,
    });
  }
};
