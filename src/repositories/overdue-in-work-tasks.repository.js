import { postgres } from '../../config/database.js'

class OverdueInWorkTasksRepository {
	async getAll() {
		const all_data = await postgres.query(
			`
			
		`
		)
		return all_data
	}
	async getLeaders(startDate, endDate) {
		const leaders_data = await postgres.query(
			`
			
		`
		)
		return leaders_data
	}
	async getLeaderDepartments(startDate, endDate, leader) {
		const departments_data = await postgres.query(
			`
			
		`
		)
		return departments_data
	}
	async getDepartmentEmployees(startDate, endDate, department) {
		const employees_data = await postgres.query(
			`
			
		`
		)
		return employees_data
	}
	async getPerson(startDate, endDate, person) {
		const person_data = await postgres.query(
			`
			
		`
		)
		return person_data
	}
}

export default new OverdueInWorkTasksRepository()
