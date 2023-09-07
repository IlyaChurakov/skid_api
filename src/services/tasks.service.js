import TasksRepository from '../repositories/tasks.repository.js'

class TasksService {
	async getLeaders(startDate, endDate) {
		const leaders_data = await TasksRepository.getLeaders(startDate, endDate)
		return leaders_data.rows
	}
	async getLeaderDepartments(startDate, endDate, leader) {
		const leaderDepartment_data = await TasksRepository.getLeaderDepartments(
			startDate,
			endDate,
			leader
		)
		return leaderDepartment_data.rows
	}
	async getDepartmentEmployees(startDate, endDate, department) {
		const departmentEmployees_data =
			await TasksRepository.getDepartmentEmployees(
				startDate,
				endDate,
				department
			)
		return departmentEmployees_data.rows
	}
	async getPerson(startDate, endDate, person) {
		const person_data = await TasksRepository.getPerson(
			startDate,
			endDate,
			person
		)
		return person_data.rows
	}
	async getDepartment(startDate, endDate, department) {
		const leader_data = await TasksRepository.getDepartment(
			startDate,
			endDate,
			department
		)
		return leader_data.rows
	}
}

export default new TasksService()
