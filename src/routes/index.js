import express from 'express'

import callsRoutes from './calls.routes.js'
import overdueTasksRoutes from './overdue-in-work-tasks.routes.js'
import tasksRoutes from './tasks.routes.js'
import topEmployeesRoutes from './top-employees.routes.js'
import worktimeRoutes from './worktime.routes.js'

const router = express.Router()

router.use('/worktime', worktimeRoutes)
router.use('/performing', overdueTasksRoutes)
router.use('/topEmployees', tasksRoutes)
router.use('/overdueTasks', topEmployeesRoutes)
router.use('/calls', callsRoutes)

export default router
