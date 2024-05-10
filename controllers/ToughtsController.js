const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtsController {
  // exibindo a home
  static async showToughts(req,res){
    res.render('toughts/home')
  }
  // exibindo o dashboard
  static async dashboard(req,res){
    res.render('toughts/dashboard')
  }
  // exibindo o formulário de criação de pensamentos
  static addTought(req,res){
    res.render('toughts/add')
  }
  static async addToughtPost(req, res){
    
  }
}