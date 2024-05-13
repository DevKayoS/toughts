const Tought = require('../models/Tought')
const User = require('../models/User')

module.exports = class ToughtsController {
  // exibindo a home
  static async showToughts(req,res){
    res.render('toughts/home')
  }
  // exibindo o dashboard
  static async dashboard(req,res){
    const userId = req.session.userid
    const user =  await User.findOne({
      where: {
        id: userId
      },
      include: Tought,
      plain: true,
    })
    // checando se o usuário esta logado
    if(!user){
      res.redirect('/login')
    }
    const toughts = user.Toughts.map((result)=>result.dataValues)
    let emptyToughts = false

    if(toughts.length === 0){
      emptyToughts = true
    }

    res.render('toughts/dashboard', {toughts, emptyToughts})
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

static async removeTought(req, res){
  const id = req.body.id
  const userId = req.session.userid
  try {
    await Tought.destroy({where: {id:id,  UserId: userId }})
    req.flash('message', 'Pensamento excluído com sucesso!')
    req.session.save(()=>{
      res.redirect('/toughts/dashboard')
    })
  } catch (error) {
    console.log('Aconteceu um erro: ', error)
  }
}
}