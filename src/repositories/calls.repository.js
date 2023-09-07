import { postgres } from '../../config/database.js'

class CallsRepository {
	async getLeaders(startDate, endDate) {
		const leaders_data = await postgres.query(
			`
			
		`,
			[startDate, endDate]
		)
		return leaders_data
	}
	async getLeaderDepartments(startDate, endDate, leader) {
		console.log(startDate, endDate, leader)
		const departments_data = await postgres.query(
			`
			
		`,
			[startDate, endDate, leader]
		)
		return departments_data
	}
	async getDepartmentEmployees(startDate, endDate, department) {
		const employees_data = await postgres.query(
			`
			
		`,
			[startDate, endDate, department]
		)
		return employees_data
	}
	async getPerson(startDate, endDate, person) {
		console.log(startDate, endDate, person)
		const person_data = await postgres.query(
			`
			
		`,
			[startDate, endDate, person]
		)
		return person_data
	}
}

export default new CallsRepository()
