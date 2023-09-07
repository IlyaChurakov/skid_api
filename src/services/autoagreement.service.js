import AutoagreementRepository from '../repositories/autoagreement.repository.js'

class AutoagreementService {
	async getAllEmployees(startDate, endDate) {
		const all_employees_data = await AutoagreementRepository.getAllEmployees(
			startDate,
			endDate
		)
		return all_employees_data.rows
	}
}

export default new AutoagreementService()
