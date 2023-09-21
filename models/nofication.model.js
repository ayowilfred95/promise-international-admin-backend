
const {DataTypes} = require('sequelize')
const sequelize = require('../database')

const Notify = sequelize.define('notifications',{
    title: {
    type: DataTypes.STRING,
    allowNull: false
    },
    body: {
    type:DataTypes.STRING,
    allowNull: false
    }
    })

module.exports = Notify;