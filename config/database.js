import dotenv from 'dotenv'
import pg from 'pg'

dotenv.config()

const Pool = pg.Pool

export const postgres = new Pool({
	user: process.env.PG_USER,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	password: process.env.PG_PASSWORD,
	port: process.env.PG_PORT
})

// export const getData = async body => {
// 	const data = await postgres.query(body)
// 	return data
// }
