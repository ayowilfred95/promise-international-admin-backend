const express = require('express');
const { registerAdmin, loginAdmin, authorisedAdmin, resetPassword } = require('../controllers/auth.controller');
const Router = express.Router()


Router.route('/register').post(registerAdmin)
Router.route('/login').post(loginAdmin)
Router.route('/password/reset').post(authorisedAdmin,resetPassword)

module.exports = Router;
