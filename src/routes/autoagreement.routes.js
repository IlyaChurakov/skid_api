import express from 'express'
import AutoargeementController from '../controllers/autoargeement.controller.js'

const router = express.Router()

router.route('/autoagreements').get(AutoargeementController.getAll)

export default router
