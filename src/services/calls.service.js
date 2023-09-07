import CallsRepository from '../repositories/calls.repository.js'

class CallsService {
	async getLeaders(startDate, endDate) {
		const leaders_data = await CallsRepository.getLeaders(startDate, endDate)
		return leaders_data.rows
	}
	async getLeaderDepartments(startDate, endDate, leader) {
		const leaderDepartment_data = await CallsRepository.getLeaderDepartments(
			startDate,
			endDate,
			leader
		)
		return leaderDepartment_data.rows
	}
	async getDepartmentEmployees(startDate, endDate, department) {
		const departmentEmployees_data =
			await CallsRepository.getDepartmentEmployees(
				startDate,
				endDate,
				department
			)
		return departmentEmployees_data.rows
	}
	async getPerson(startDate, endDate, person) {
		const person_data = await CallsRepository.getPerson(
			startDate,
			endDate,
			person
		)
		return person_data.rows
	}
}

export default new CallsService()
