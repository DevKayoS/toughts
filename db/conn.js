const {Sequelize} = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('toughts', 'root', process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
})

try {
  sequelize.authenticate()
  console.log('Server has been connect')
} catch (error) {
  console.log('Não foi possivel se conectar: ',error)
}

module.exports=sequelize