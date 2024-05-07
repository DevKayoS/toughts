const express = require('express')
const expbhs = require('express-handlebars')
// salvar o login na sessão
const session = require('express-session')
// salvar a sessão na pasta de sessão
const FileStore = require('session-file-store')(session)
// responsavel pelas flash messages
const flash = require('express-flash')
// iniciando o express
const app = express()

// conectando ao banco de dados
const conn = require('./db/conn')

// MODELS
const Toughts = require('./models/Tought')
const User = require('./models/User')

// configurando o handlebars
app.engine('handlebars', expbhs.engine())
app.set('views engine', 'handlebars')

// receber resposta do body
app.use(express.urlencoded({
  extended:true
}))
app.use(express.json())

// session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    // configurando o arquivo que vai ficar salvo as sessões do usuário
    store: new FileStore({
      logFn: function(){},
      path: require('path').join(require('os').tmpdir(), 'sessions')
    }),
    // configurando o cookie
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now()+360000),
      httpOnly: true
    }
  })
)
// flash messages
app.use(flash())

// public path
app.use(express.static('public'))

// salvar a session no res
app.use((req,res, next)=>{
  if(req.session.userid){
    res.locals.session = req.session
  }
  next()
})

conn.sync().then(()=>{
  app.listen(3333)
}).catch((err)=>console.log(err))