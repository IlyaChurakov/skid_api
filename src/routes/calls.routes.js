import express from 'express'
import CallsController from '../controllers/calls.controller.js'

const router = express.Router()

router.route('/leaders/:startDate/:endDate').get(CallsController.getLeaders)
router
	.route('/departments/:startDate/:endDate/:leader')
	.get(CallsController.getLeaderDepartments)
router
	.route('/employees/:startDate/:endDate/:department')
	.get(CallsController.getDepartmentEmployees)
router
	.route('/person/:startDate/:endDate/:person')
	.get(CallsController.getPerson)

export default router
