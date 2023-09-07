import Calls from '../services/calls.service.js'

class CallsController {
	async getLeaders(req, res) {
		const all_positions = await Calls.getLeaders(startDate, endDate)
		res.json(all_positions)
	}
	async getLeaderDepartments(req, res) {
		const { startDate, endDate, leader } = req.params

		const position = await Calls.getLeaderDepartments(
			startDate,
			endDate,
			leader
		)
		res.json(position)
	}
	async getDepartmentEmployees(req, res) {
		const { startDate, endDate, department } = req.params

		const common_zones = await Calls.getDepartmentEmployees(
			startDate,
			endDate,
			department
		)
		res.json(common_zones)
	}
	async getPerson(req, res) {
		const { startDate, endDate, person } = req.params

		const person_data = await Calls.getPerson(startDate, endDate, person)
		res.json(person_data)
	}
}

export default new CallsController()
