const express = require('express')
const router = express.Router()

const ToughtsController = require('../controllers/ToughtsController')

const checkAuth = require('../helpers/auth').checkAuth

router.get('/', ToughtsController.showToughts)
router.get('/dashboard', checkAuth, ToughtsController.dashboard)
router.post('/remove', checkAuth, ToughtsController.removeTought)
router.get('/add', checkAuth, ToughtsController.addTought)
router.post('/add', checkAuth, ToughtsController.addToughtPost)
router.get('/update/:id', checkAuth, ToughtsController.updateToughts)
router.post('/update', checkAuth, ToughtsController.updateToughtsPost)

module.exports = router