import { postgres } from '../../config/database.js'

class CallsRepository {
	async getAllPositions() {
		const all_positions_data = await postgres.query(
			`
			
		`
		)
		return all_positions_data
	}
	async getPosition() {
		const position_data = await postgres.query(
			`
			
		`
		)
		return position_data
	}
	async getCommonZones() {
		const common_zones_data = await postgres.query(
			`
			
		`
		)
		return common_zones_data
	}
}

export default new CallsRepository()
