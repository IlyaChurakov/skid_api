import AutoagreementService from '../services/autoagreement.service.js'

class AutoagreementController {
	async getAll(req, res) {
		const { startDate, endDate } = req.params

		const all_employees = await AutoagreementService.getAllEmployees(
			startDate,
			endDate
		)
		res.json(all_employees)
	}
}

export default new AutoagreementController()
