import { postgres } from '../../config/database.js'

class AutoagreementRepository {
	async getAllEmployees() {
		const all_employees_data = await postgres.query(
			`
			
		`
		)
		return all_employees_data
	}
}

export default new AutoagreementRepository()
