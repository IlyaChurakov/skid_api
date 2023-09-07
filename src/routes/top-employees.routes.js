import express from 'express'
import TopEmployeesController from '../controllers/top-employees.controller.js'

const router = express.Router()

router
	.route('/leaders/:startDate/:endDate')
	.get(TopEmployeesController.getLeaders)
router
	.route('/departments/:startDate/:endDate/:leader')
	.get(TopEmployeesController.getLeaderDepartments)
router
	.route('/employees/:startDate/:endDate/:department')
	.get(TopEmployeesController.getDepartmentEmployees)
router
	.route('/person/:startDate/:endDate/:department')
	.get(TopEmployeesController.getPerson)

export default router
