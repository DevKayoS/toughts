const Toughts = require('../models/Tought')
const Tought = require('../models/Tought')
const User = require('../models/User')
// operador para fazer pesquisa
const {Op} = require('sequelize')

module.exports = class ToughtsController {
  // exibindo a home
  static async showToughts(req,res){
    
    // configurando para busca
    let search=''
    if(req.query.search){
      search=req.query.search
    }
    // fazendo a ordenação
    let order='DESC'
    if(req.query.order==='old'){
      order='ASC'
    }else {
      order ='DESC'
    }

    const toughtsData = await Toughts.findAll({
      include: User,
      // se vir alguma coisa no search ele vai filtrar com oq veio 
      where:{
        title: {[Op.like]: `%${search}%`}
      },
      order: [['createdAt', order]]
    })

    const toughts = toughtsData.map((result)=> result.get({plain: true}))
    // exibir a quantide de pensamentos filtrados
    let toughtsQty = toughts.length
    if(toughtsQty === 0){
      toughtsQty=false
    }

    res.render('toughts/home', {toughts, search, toughtsQty})
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
// removendo pensamento
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
// exibindo a aba de edição
static async updateToughts(req,res){
  const id = req.params.id
  const UserId = req.session.userid
  const toughts = await Toughts.findOne({raw: true, where: {id:id, UserId: UserId}})

  res.render('toughts/update', {toughts})
}

// atualizando no banco de dados 
static async updateToughtsPost(req,res){
  const UserId =  req.session.userid
  const id = req.body.id

  const tought = {
    title: req.body.title,
  }
  try {
    await Tought.update(tought, {where: {id: id, UserId: UserId}})
    req.flash('message', 'Pensamento atualizado com sucesso!')
    req.session.save(()=>{
      res.redirect('/toughts/dashboard')
    })
  } catch (error) {
    console.log('Aconteceu um erro: '. error)
  }
}
}