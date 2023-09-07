import express from 'express'

const router = express.Router()

router.route('/leaders/:startDate/:endDate').get()
router.route('/departments/:startDate/:endDate/:name').get()
router.route('/employees/:startDate/:endDate/:department').get()

export default router
