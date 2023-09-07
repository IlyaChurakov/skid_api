import express from 'express'
import asyncHandler from 'express-async-handler'
import TasksController from '../controllers/tasks.controller.js'

const router = express.Router()

router
	.route('/leaders/:startDate/:endDate')
	.get(asyncHandler(TasksController.getLeaders))
router
	.route('/leaders/:startDate/:endDate/:leader')
	.get(asyncHandler(TasksController.getLeader))
router
	.route('/departments/:startDate/:endDate/:leader')
	.get(asyncHandler(TasksController.getLeaderDepartments))
router
	.route('/employees/:startDate/:endDate/:department')
	.get(asyncHandler(TasksController.getDepartmentEmployees))
router
	.route('/person/:startDate/:endDate/:person')
	.get(asyncHandler(TasksController.getPerson))

export default router
