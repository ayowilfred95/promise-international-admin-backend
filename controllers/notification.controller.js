const Notify = require('../models/nofication.model')
const sequelize = require('../database')

exports.create = async (req,res) => {
    const {title,body} = req.body;
    try {
        await sequelize.sync()
        const notify = await Notify.create({
         title: title,
         body: body
        })

        res.status(201).json({
            status: "success",
            data: notify
        })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            data: "notification not created"
        })
    }
}

exports.getAll = async (req,res) => {
    try {
        await sequelize.sync()
    const notify = await Notify.findAll()
    res.status(200).json({
        status: 'success',
        data: notify
    })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            data: error
        })
    }
}

exports.deleteById = async (req,res) => {
    try {
        await sequelize.sync()
     await Notify.destroy({
        where: {
            id: req.params.id
        }
     })

     res.status(200).json({
        status: "success",
        data: null
     })
        
    } catch (error) {
        res.status(400).json({
            status: "failed",
            data: error
        })
    }
}

exports.updateById = async (req,res) => {
    const {id} = req.params;
    try {
        await sequelize.sync()
        const notify = await Notify.update({
            title: req.body.title,
            body: req.body.body
        },{where: {
            id: id
        }})
        res.status(200).json({
            status: 'success',
            data: notify
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            data: error
        })
    }
}