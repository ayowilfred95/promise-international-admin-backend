const express = require('express');
const { authorisedAdmin } = require('../controllers/auth.controller');
const { create, getAll, deleteById, updateById } = require('../controllers/notification.controller');

const router = express.Router();

router.route("/").post(authorisedAdmin,create).get(getAll)
router.route("/:id").delete(authorisedAdmin,deleteById).put(authorisedAdmin,updateById)



module.exports = router;

// const Sequelize = require('sequelize')

// const sequelize = new Sequelize('alimisam_Promise','alimisam_promise-user','Promise@2022',{
//     host: 'localhost',
//     dialect: 'mysql'
// })


// module.exports = sequelize;