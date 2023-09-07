import OverdueTasks from '../services/overdue-in-work-tasks.service.js'

class OverdueInWorkTasksController {
	async getAll(req, res) {
		const { startDate, endDate } = req.params

		const all = await OverdueTasks.getAll(startDate, endDate)
		res.json(all)
	}
	async getLeaders(req, res) {
		const { startDate, endDate } = req.params

		const leaders = await OverdueTasks.getLeaders(startDate, endDate)
		res.json(leaders)
	}
	async getLeaderDepartments(req, res) {
		const { startDate, endDate, leader } = req.params

		const departments = await OverdueTasks.getLeaderDepartments(
			startDate,
			endDate,
			leader
		)
		res.json(departments)
	}
	async getDepartmentEmployees(req, res) {
		const { startDate, endDate, department } = req.params

		const employees = await OverdueTasks.getDepartmentEmployees(
			startDate,
			endDate,
			department
		)
		res.json(employees)
	}
	async getPerson(req, res) {
		const { startDate, endDate, person } = req.params

		const person_data = await OverdueTasks.getPerson(startDate, endDate, person)
		res.json(person_data)
	}
}

export default new OverdueInWorkTasksController()
