const {DataTypes} = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Toughts = db.define('Toughts', {
  title: {
    type: DataTypes.STRING,
    require: true,
    allowNull: false
  }
})

Toughts.belongsTo(User)
User.hasMany(Toughts)

module.exports = Toughts