import TopEmployeesRepository from '../repositories/top-employees.repository.js'

class TopEmployees {
	async getLeaders(startDate, endDate) {
		const leaders_data = await TopEmployeesRepository.getLeaders(
			startDate,
			endDate
		)
		return leaders_data.rows
	}
	async getLeaderDepartments(startDate, endDate, leader) {
		const leaderDepartment_data =
			await TopEmployeesRepository.getLeaderDepartments(
				startDate,
				endDate,
				leader
			)
		return leaderDepartment_data.rows
	}
	async getDepartmentEmployees(startDate, endDate, department) {
		const departmentEmployees_data =
			await TopEmployeesRepository.getDepartmentEmployees(
				startDate,
				endDate,
				department
			)
		return departmentEmployees_data.rows
	}
	async getPerson(startDate, endDate, person) {
		const person_data = await TopEmployeesRepository.getPerson(
			startDate,
			endDate,
			person
		)
		return person_data.rows
	}
}

export default new TopEmployees()
