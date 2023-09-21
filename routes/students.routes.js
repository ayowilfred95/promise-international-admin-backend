const express = require('express');
const { authorisedAdmin } = require('../controllers/auth.controller');
const { create, getAll, getOneById, updateOneById, deleteOneById } = require('../controllers/students.controllers');
const Router = express.Router()


Router.route('/').get(getAll).post(authorisedAdmin,create)
Router.route('/:id').get(authorisedAdmin,getOneById).put(updateOneById).delete(authorisedAdmin,deleteOneById)

module.exports = Router
