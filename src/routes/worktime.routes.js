import express from 'express'
import asyncHandler from 'express-async-handler'
import WorktimeController from '../controllers/worktime.controller.js'

const router = express.Router()

router
	.route('/leaders/:startDate/:endDate')
	.get(asyncHandler(WorktimeController.getLeaders))
router
	.route('/leaders/:startDate/:endDate/:leader')
	.get(asyncHandler(WorktimeController.getLeader))
router
	.route('/departments/:startDate/:endDate/:leader')
	.get(asyncHandler(WorktimeController.getLeaderDepartments))
router
	.route('/employees/:startDate/:endDate/:department')
	.get(asyncHandler(WorktimeController.getDepartmentEmployees))
router
	.route('/person/:startDate/:endDate/:person')
	.get(asyncHandler(WorktimeController.getPerson))

export default router
