import OverdueInWorkTasksRepository from '../repositories/overdue-in-work-tasks.repository.js'

class OverdueInWorkTasksService {
	async getAll(startDate, endDate) {
		const all_data = await OverdueInWorkTasksRepository.getAll(
			startDate,
			endDate
		)
		return all_data.rows
	}
	async getLeaders(startDate, endDate) {
		const leaders_data = await OverdueInWorkTasksRepository.getLeaders(
			startDate,
			endDate
		)
		return leaders_data.rows
	}
	async getLeaderDepartments(startDate, endDate) {
		const departments_data =
			await OverdueInWorkTasksRepository.getLeaderDepartments(
				startDate,
				endDate,
				leader
			)
		return departments_data.rows
	}
	async getDepartmentEmployees(startDate, endDate) {
		const employees_data =
			await OverdueInWorkTasksRepository.getDepartmentEmployees(
				startDate,
				endDate,
				department
			)
		return employees_data.rows
	}
	async getPerson(startDate, endDate) {
		const person_data = await OverdueInWorkTasksRepository.getPerson(
			startDate,
			endDate,
			person
		)
		return person_data.rows
	}
}

export default new OverdueInWorkTasksService()
