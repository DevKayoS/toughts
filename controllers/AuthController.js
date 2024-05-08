const User = require('../models/User')

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

    await User.create(registerUser)

    res.redirect('/')
  }
}