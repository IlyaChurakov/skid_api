import TopEmployees from '../services/top-employees.service.js'

class TopEmployeesController {
	async getLeaders(req, res) {
		const { startDate, endDate } = req.params

		const leaders = await TopEmployees.getLeaders(startDate, endDate)
		res.json(leaders)
	}
	async getLeaderDepartments(req, res) {
		const { startDate, endDate, leader } = req.params

		const departments = await TopEmployees.getLeaderDepartments(
			startDate,
			endDate,
			leader
		)
		res.json(departments)
	}
	async getDepartmentEmployees(req, res) {
		const { startDate, endDate, department } = req.params

		const employees = await TopEmployees.getDepartmentEmployees(
			startDate,
			endDate,
			department
		)
		res.json(employees)
	}
	async getPerson(req, res) {
		const { startDate, endDate, person } = req.params

		const person_data = await TopEmployees.getPerson(startDate, endDate, person)
		res.json(person_data)
	}
}

export default new TopEmployeesController()
