const express = require('express');
const { registerAdmin, loginAdminTeacher, authorisedAdmin, resetPassword } = require('../controllers/auth.controller');
const Router = express.Router()


Router.route('/register').post(registerAdmin)
// login route for both admin and teacher
Router.route('/login').post(loginAdminTeacher)
Router.route('/password/reset').post(authorisedAdmin,resetPassword)

module.exports = Router;
