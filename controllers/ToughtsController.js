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
  // adicionando pensamento no banco de dados
  static async addToughtPost(req, res){
   const tought = {
    title: req.body.title,
    UserId: req.session.userid
   }
    
   try {
      await Tought.create(tought)
      req.flash('message','Pensamento adicionado com sucesso!')
      req.session.save(()=>{
        res.redirect('/toughts/dashboard')
      })
   } catch (error) {
    console.log('Aconteceu um erro: ',error)
   }
  }
}