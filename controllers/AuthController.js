const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class AuthController {
  // renderizar a página de login do usuário
  static login(req,res){
    res.render('auth/login')
  }
  // renderizar a página de registro do usuário
  static register(req,res){
    res.render('auth/register')
  }
  // registrar usuário
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
  // deslogando usuário
    static async logoutUser(req,res){
      req.session.destroy()
      res.redirect('/login')
    }

    // fazendo o login do usuário
    static async loginUser(req,res){
      const {email, password} = req.body
      // validando se o usuário existe
      const user = await User.findOne({where: {email: email}})
      if(!user){
        req.flash('message', 'O usuário não foi encontrado')
        res.redirect('/login')
        return
      }

      // validando se a senha enviada pelo formulário é a mesma ques tá no banco de dados
      const passwordMatch = bcrypt.compareSync(password, user.password)
      if(!passwordMatch){
        req.flash('message', 'A senha é inválida')
        res.redirect('/login')
        return
      }
      req.session.userid = user.id
      req.flash('message', 'Autenficação do usuário realizada com sucesso')
      req.session.save(()=>{
        res.redirect('/')
      })
    }

}