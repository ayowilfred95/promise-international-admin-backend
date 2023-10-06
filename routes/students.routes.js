const express = require('express');
const { authorisedAdmin } = require('../controllers/auth.controller');
const { create, getAll, getOneById, updateOneById, deleteOneById,getStudentsByTeacher } = require('../controllers/students.controllers');
const Router = express.Router()


Router.route('/').get(getAll).post(authorisedAdmin,create)
Router.route('/:id').get(getOneById).put(authorisedAdmin,updateOneById).delete(authorisedAdmin,deleteOneById)
Router.route('/teacher/students/:id').get(getStudentsByTeacher)
module.exports = Router
