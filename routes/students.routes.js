const express = require('express');
const { authorisedAdmin } = require('../controllers/auth.controller');
const { create, getAll, getOneById, updateOneById, deleteOneById,getStudentsByTeacher ,login} = require('../controllers/students.controllers');
const Router = express.Router()


Router.route('/').get(getAll).post(authorisedAdmin,create)
Router.route('/login').post(login)
Router.route('/:id').get(getOneById).put(authorisedAdmin,updateOneById).delete(authorisedAdmin,deleteOneById)
Router.route('/teacher/students/:id').get(getStudentsByTeacher)
module.exports = Router
