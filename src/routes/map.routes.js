import express from 'express'
import MapController from '../controllers/map.controller'

const router = express.Router()

router.route('/positions').get(MapController.getAllPositions)
router.route('/position/:person').get(MapController.getPosition)
router.route('/zones').get(MapController.getCommonZones)

export default router
