const JWT = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const Teacher = require("../models/teacherModel");
const bcrypt = require("bcrypt");
const sequelize = require("../database");

// Register an admin
exports.registerAdmin = async (req, res) => {
  try {
    await sequelize.sync();

    const { fullName, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // isAdmin is set to tru
    if (hashedPassword) {
      const admin = await Admin.create({
        fullName: fullName,
        email: email,
        password: hashedPassword,
        isAdmin: true,
      });

      res.status(201).json({
        status: "success",
        data: admin,
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: error,
    });
  }
};

// Login Admin or Teacher
/**
 * @ dev The same route was used for both admin and teacher to login
 *  but different route to register admin and teacher
 */
exports.loginAdminTeacher = async (req, res) => {
  try {
    await sequelize.sync();
    const { email, password } = req.body;
    console.log(`Attempting login for email: ${email}`); // Debug

    // Check if credentials match an admin
    const admin = await Admin.findOne({
      where: {
        email: email,
      },
    });

    if (admin) {
      const decryptedPassword = await bcrypt.compare(password, admin.password);
      if (decryptedPassword) {
        const accessToken = JWT.sign(
          {
            isAdmin: admin.isAdmin,
            id: admin.id,
            email: admin.email,
          },
          process.env.JWT_SEC,
          { expiresIn: "1d" }
        );

        console.log("Admin login successful"); // Debug
        return res.status(201).json({
          status: "success",
          data: admin,
          token: accessToken,
        });
      }
    }

    // Check if credentials match a teacher record
    const teacher = await Teacher.findOne({
      where: {
        email: email,
      },
    });

    if (teacher) {
      const decryptedPassword = await bcrypt.compare(
        password,
        teacher.password
      );
      if (decryptedPassword) {
        const accessToken = JWT.sign(
          {
            isAdmin: teacher.isAdmin,
            id: teacher.id,
            email: teacher.email,
          },
          process.env.JWT_SEC,
          { expiresIn: "1d" }
        );

        console.log("Teacher login successful"); // Debug
        return res.status(200).json({
          status: "success",
          data: teacher,
          token: accessToken,
        });
      }
    }

    console.log("Login failed"); // Debug
    // If neither admin nor teacher authentication is successful
    return res.status(400).json({
      status: "failed",
      message: "Invalid email or password",
    });
  } catch (error) {
    console.error("Error:", error); // Log the error
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error,
    });
  }
};

// reset admin password
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    await sequelize.sync();
    const admin = await Admin.findOne({
      where: {
        email: email,
      },
    });
    if (admin.email === email) {
      await Admin.update(
        {
          password: password,
        },
        {
          where: {
            email: email,
          },
        }
      );
      res.status(201).json({
        status: "success",
        message: "password successfully changed",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "failed",
      error: "check email properly",
    });
  }ge
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    JWT.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err)
        return res
          .status(401)
          .json({ status: "failed", message: "unauthorised user", error: err });
      req.user = user;
      next();
    });
  } else {
    res.status(403).json({
      status: "failed",
      message: "not an authorised user",
    });
  }
};

exports.authorisedAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({
        status: "failed",
        message: "authorisation failed",
      });
    }
  });
};
