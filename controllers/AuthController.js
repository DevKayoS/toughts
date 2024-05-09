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
    const registerUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword
    }
    // password match validation
    if(registerUser.password != registerUser.confirmpassword){
      // mensagem para o front
      req.flash('message', 'As senhas não conferem, tente novamente!')
      res.render('auth/register')
      return
    }

    // await User.create(registerUser)

    res.redirect('/')
  }
}