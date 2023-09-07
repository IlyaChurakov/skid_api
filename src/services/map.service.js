import MapRepository from '../repositories/map.repository.js'

class MapService {
	async getAllPositions() {
		const all_positions_data = await MapRepository.getAllPositions()
		return all_positions_data.rows
	}
	async getPosition() {
		const position_data = await MapRepository.getPosition()
		return position_data.rows
	}
	async getCommonZones() {
		const common_zones_data = await MapRepository.getCommonZones()
		return common_zones_data.rows
	}
}

export default new MapService()
