import WorktimeRepository from '../repositories/worktime.repository.js'

class WorktimeService {
	async getLeaders(startDate, endDate) {
		const leaders_data = await WorktimeRepository.getLeaders(startDate, endDate)
		return leaders_data.rows
	}
	async getLeaderDepartments(startDate, endDate, leader) {
		const leaderDepartment_data = await WorktimeRepository.getLeaderDepartments(
			startDate,
			endDate,
			leader
		)
		return leaderDepartment_data.rows
	}
	async getDepartmentEmployees(startDate, endDate, department) {
		const departmentEmployees_data =
			await WorktimeRepository.getDepartmentEmployees(
				startDate,
				endDate,
				department
			)
		return departmentEmployees_data.rows
	}
	async getPerson(startDate, endDate, person) {
		const person_data = await WorktimeRepository.getPerson(
			startDate,
			endDate,
			person
		)
		return person_data.rows
	}
	async getLeader(startDate, endDate, leader) {
		const leader_data = await WorktimeRepository.getLeader(
			startDate,
			endDate,
			leader
		)
		return leader_data.rows
	}
}

export default new WorktimeService()
