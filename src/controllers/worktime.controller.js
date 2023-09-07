import WorktimeService from '../services/worktime.service.js'

class WorktimeController {
	async getLeaders(req, res) {
		const { startDate, endDate } = req.params

		const _leaders = await WorktimeService.getLeaders(startDate, endDate)
		res.json(_leaders)
	}
	async getLeaderDepartments(req, res) {
		const { startDate, endDate, leader } = req.params

		const _leader_departments = await WorktimeService.getLeaderDepartments(
			startDate,
			endDate,
			leader
		)
		res.json(_leader_departments)
	}
	async getDepartmentEmployees(req, res) {
		const { startDate, endDate, department } = req.params

		const _department_employees = await WorktimeService.getDepartmentEmployees(
			startDate,
			endDate,
			department
		)
		res.json(_department_employees)
	}
	async getPerson(req, res) {
		const { startDate, endDate, person } = req.params

		const _person = await WorktimeService.getPerson(startDate, endDate, person)
		res.json(_person)
	}
	async getLeader(req, res) {
		const { startDate, endDate, leader } = req.params

		const _leader = await WorktimeService.getLeader(startDate, endDate, leader)
		res.json(_leader)
	}
}

export default new WorktimeController()
