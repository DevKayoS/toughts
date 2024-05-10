const express = require('express')
const router = express.Router()

const ToughtsController = require('../controllers/ToughtsController')

const checkAuth = require('../helpers/auth').checkAuth

router.get('/', ToughtsController.showToughts)
router.get('/dashboard', checkAuth, ToughtsController.dashboard)

module.exports = router