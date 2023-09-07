import MapService from '../services/map.service.js'

class MapController {
	async getAllPositions(req, res) {
		const all_positions = await MapService.getAllPositions()
		res.json(all_positions)
	}
	async getPosition(req, res) {
		const position = await MapService.getPosition()
		res.json(position)
	}
	async getCommonZones(req, res) {
		const common_zones = await MapService.getCommonZones()
		res.json(common_zones)
	}
}

export default new MapController()
