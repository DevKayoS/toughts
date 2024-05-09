const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {
  static login(req,res){
    res.render('auth/login')
  }

  static register(req,res){
    res.render('auth/register')
  }

  static async registerUser(req,res){
    const {name, email, password, confirmpassword} = req.body
    // password match validation
    if(password != confirmpassword){
      // mensagem para o front
      req.flash('message', 'As senhas não conferem, tente novamente!')
      res.render('auth/register')
      return
    }
    // checando se existe o usuário
    const checkUserExists = await User.findOne({raw: true, where: {email: email}})
    if(checkUserExists){
      req.flash('message', 'E-mail já está em uso!')
      res.render('auth/register')
      return
    }
    // criar uma senha
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
    const user = {
      name,
      email,
      password: hashedPassword,
    }
    try {
     const createdUser = await User.create(user)
      // inicializar a sssão
      req.session.userid = createdUser.id

      req.flash('message', 'Cadastro realizado com sucesso!')
      req.session.save(()=>{
        res.redirect('/')
      })
      
    } catch (error) {
      console.log(error)
    }
  }
}