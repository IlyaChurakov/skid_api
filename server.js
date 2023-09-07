import 'colors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { errorHandler, notFound } from './src/middleware/error.middleware.js'
// import callsRoutes from './src/routes/calls.routes.js'
// import overdueTasksRoutes from './src/routes/overdue-tasks.routes.js'
// import performingRoutes from './src/routes/performing.routes.js'
// import topEmployeesRoutes from './src/routes/top-employees.routes.js'
// import worktimeRoutes from './src/routes/worktime.routes.js'
import router from './src/routes/index.js'

dotenv.config()

const app = express()

async function main() {
	if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

	app.use(express.json())

	const __dirname = path.resolve()

	app.use('/uploads', express.static(path.join(__dirname, '/uploads/')))

	app.use('/api', router)

	app.use(notFound)
	app.use(errorHandler)

	const PORT = process.env.PORT || 5000

	app.listen(
		PORT,
		console.log(
			`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
				.bgGreen.bold
		)
	)
}

main()
