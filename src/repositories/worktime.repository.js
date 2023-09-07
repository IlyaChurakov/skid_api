import { postgres } from '../../config/database.js'

class WorktimeRepository {
	async getLeaders(startDate, endDate) {
		const leaders_data = await postgres.query(
			`
			WITH calendar AS 
			(
			SELECT 
			DATE($1) AS start_dt,
			DATE($2) AS end_dt,
			DATE($2) - DATE($1) AS delta
			),
			calculation AS (
			SELECT 
				d.short_name  ,
				e."name" ,
				CASE 
					WHEN wm.DATE BETWEEN start_dt AND end_dt THEN 'ago1w' 
					WHEN wm.DATE BETWEEN start_dt - delta*1-1 AND end_dt - delta*1-1 THEN 'ago2w'
					WHEN wm.DATE BETWEEN start_dt - delta*2-2 AND end_dt -  delta*2-2 THEN 'ago3w'
					WHEN wm.DATE BETWEEN start_dt - delta*3-3 AND end_dt -  delta*3-3 THEN 'ago4w' END AS time_per,
				COUNT (late_time) AS late_cnt,
				COUNT (1) AS all_cnt,
				avg (wm.working_time) AS avg_time ,  
				round (EXTRACT (epoch FROM avg (wm.working_time)) / EXTRACT (epoch FROM TIME '08:00') * 100 , 0) AS avg_time_percent ,
				COUNT (DISTINCT wm.name) AS cnt_state
			FROM dds.work_mart wm 
			LEFT JOIN dds.departments d ON d.short_name = wm.parent_dept 
			LEFT JOIN dds.employees e ON e.dept_id = d.dept_id 
			LEFT JOIN dds.employees e2 ON wm."name" = e2."name" 
			JOIN (SELECT name FROM data_store.c_employees ce WHERE ce.deleted = FALSE) ce ON ce.name = wm.name
			LEFT JOIN calendar c ON 1=1
			WHERE 1=1
				AND wm."date" BETWEEN start_dt - delta*3-3 AND end_dt
				AND e2.no_stat = FALSE
				AND e."name" IS NOT NULL
			GROUP BY 1, 2, 3
			ORDER BY 1, 2, 3
			),
			preselect AS (
			SELECT 
				dict.short_name,
				dict.name, 
				dict.tp AS time_per,
				COALESCE (c.late_cnt, 0) AS late_cnt, 
				COALESCE (c.all_cnt, 0) AS all_cnt,
				COALESCE (round (EXTRACT (HOUR FROM c.avg_time) + EXTRACT (MINUTE FROM c.avg_time)/ 100, 2), 0) AS avg_time,
				COALESCE (c.avg_time_percent, 0) AS avg_time_percent, 
				COALESCE (c.cnt_state, 0) AS cnt_state
			FROM (
				SELECT *
				FROM (SELECT 'ago1w' AS tp 
						UNION SELECT 'ago2w' AS tp
						UNION SELECT 'ago3w' AS tp
						UNION SELECT 'ago4w' AS tp) tp 
				JOIN (SELECT DISTINCT c.short_name, c.name FROM calculation c) dsn ON 1=1
				) AS dict 
			LEFT JOIN calculation c ON c.short_name = dict.short_name AND c.time_per = dict.tp
			ORDER BY 1, 3
			)
			SELECT 
				t.*, 
				round ((t.late_cnt->>0) :: NUMERIC / ((t.all_cnt->>0) :: NUMERIC +0.0001)* 100, 2) AS sort_late,
				(t.avg_time ->> 0) :: NUMERIC AS sort_time
			FROM (
				SELECT 
					name AS short_name,
					short_name as head,
					json_agg (late_cnt) AS late_cnt,
					json_agg (all_cnt) AS all_cnt,
					json_agg(avg_time) AS avg_time,
					json_agg (avg_time_percent) AS avg_time_percent,
					MAX (cnt_state) AS cnt_state
				FROM preselect
				GROUP BY 1, 2
				) t;
		`,
			[startDate, endDate]
		)
		return leaders_data
	}
	async getLeaderDepartments(startDate, endDate, leader) {
		console.log(startDate, endDate, leader)
		const departments_data = await postgres.query(
			`
			WITH calendar AS 
			(
			SELECT 
			DATE($1) AS start_dt,
			DATE($2) AS end_dt,
			DATE($2) - DATE($1) AS delta,
			'%' || $3 || '%' AS query
			),
			calculation AS (
			SELECT 
				wm.short_name ,
				e."name" ,
				CASE WHEN wm.DATE BETWEEN start_dt - 3*delta AND end_dt - 3*delta-1 THEN 'ago4w'
					WHEN wm.DATE BETWEEN start_dt - 2*delta AND end_dt - 2*delta-1 THEN 'ago3w'
					WHEN wm.DATE BETWEEN start_dt - 1*delta AND end_dt - 1*delta-1 THEN 'ago2w'
					WHEN wm.DATE BETWEEN start_dt AND end_dt THEN 'ago1w' END AS time_per,
				COUNT (late_time) AS late_cnt,
				COUNT (1) AS all_cnt,
				round (EXTRACT (HOUR FROM avg (wm.working_time)) + EXTRACT (MINUTE FROM avg (wm.working_time))/100, 2) AS avg_time ,
				round (EXTRACT (epoch FROM date_trunc('second', avg (wm.working_time))) / EXTRACT (epoch FROM TIME '08:00') * 100 , 0) AS avg_time_percent ,
				COUNT (DISTINCT wm.name) AS cnt_state
			FROM dds.work_mart wm 
			LEFT JOIN dds.departments d ON d.short_name = wm.parent_dept 
			LEFT JOIN dds.employees e ON e.dept_id = d.dept_id 
			LEFT JOIN dds.employees e2 ON wm."name" = e2."name" 
			JOIN (SELECT name FROM data_store.c_employees ce WHERE ce.deleted = FALSE) ce ON ce.name = wm.name
			LEFT JOIN calendar c ON 1=1
			WHERE 1=1
				AND wm."date" BETWEEN start_dt - 3*delta AND end_dt
				AND (e."name" LIKE query) --сюда надо ввывести short_name из основого клика
				AND e2.no_stat = FALSE
			GROUP BY 1,2,3
			ORDER BY 1, 2, 3
			), 
			preselect AS (
			SELECT 
				dict.short_name,
				dict.name, 
				dict.tp AS time_per,
				COALESCE (c.late_cnt, 0) AS late_cnt, 
				COALESCE (c.all_cnt, 0) AS all_cnt,
				COALESCE (c.avg_time, 0) AS avg_time,
				COALESCE (c.avg_time_percent, 0) AS avg_time_percent, 
				COALESCE (c.cnt_state, 0) AS cnt_state
			FROM (
				SELECT *
				FROM (SELECT 'ago1w' AS tp 
						UNION SELECT 'ago2w' AS tp
						UNION SELECT 'ago3w' AS tp
						UNION SELECT 'ago4w' AS tp) tp 
				JOIN (SELECT DISTINCT c.short_name, c.name FROM calculation c) dsn ON 1=1
				) AS dict 
			LEFT JOIN calculation c ON c.short_name = dict.short_name AND c.time_per = dict.tp
			ORDER BY 1, 3
			)
			SELECT 
				name AS head,
				short_name,
				json_agg (late_cnt) AS late_cnt,
				json_agg (all_cnt) AS all_cnt,
				json_agg(avg_time) AS avg_time,
				json_agg (avg_time_percent) AS avg_time_percent,
				MAX (cnt_state) AS cnt_state
			FROM preselect
			GROUP BY 1, 2
			order by 2;
		`,
			[startDate, endDate, leader]
		)
		return departments_data
	}
	async getDepartmentEmployees(startDate, endDate, department) {
		const employees_data = await postgres.query(
			`
			WITH calendar AS 
			(
			SELECT 
				DATE($1) AS start_dt,
				DATE($2) AS end_dt,
				DATE($2) - DATE($1) AS delta, 
				$3 AS query
			),
			calculation AS (
			SELECT 
				wm.short_name,
				wm."name",
				e.no_stat,
				CASE WHEN wm.DATE BETWEEN start_dt - 3*delta AND end_dt - 3*delta-1 THEN 'ago4w'
					WHEN wm.DATE BETWEEN start_dt - 2*delta AND end_dt - 2*delta-1 THEN 'ago3w'
					WHEN wm.DATE BETWEEN start_dt - 1*delta AND end_dt - 1*delta-1 THEN 'ago2w'
					WHEN wm.DATE BETWEEN start_dt AND end_dt THEN 'ago1w' END AS time_per,    
				COUNT (late_time) AS late_cnt,
				COUNT (1) AS all_cnt,
				round (EXTRACT (HOUR FROM avg (wm.working_time)) + EXTRACT (MINUTE FROM avg (wm.working_time))/100, 2) AS avg_time ,
				round (EXTRACT (epoch FROM date_trunc('second', avg (wm.working_time))) / EXTRACT (epoch FROM TIME '08:00') * 100 , 0) AS avg_time_percent ,
				EXTRACT (HOUR FROM (SUM (working_time) + INTERVAL '1 hour')) AS sum_working_time
			FROM dds.work_mart wm
			LEFT JOIN dds.employees e ON e.name = wm.name
			JOIN (SELECT name FROM data_store.c_employees ce WHERE ce.deleted = FALSE) ce ON ce.name = wm.name
			LEFT JOIN calendar c ON 1=1
			WHERE 1=1
				AND wm."date" BETWEEN start_dt - 3*delta AND end_dt
				AND wm.short_name = query
			GROUP BY 1, 2, 3, 4
			ORDER BY 1, 2, 3
			), 
			preselect AS (
			SELECT 
				dict.short_name,
				dict.name, 
				dict.no_stat,
				dict.tp AS time_per,
				COALESCE (c.late_cnt, 0) AS late_cnt, 
				COALESCE (c.all_cnt, 0) AS all_cnt,
				COALESCE (c.avg_time, 0) AS avg_time,
				COALESCE (c.avg_time_percent, 0) AS avg_time_percent, 
				COALESCE (c.sum_working_time, 0) AS sum_working_time
			FROM (   --делаем справочник на 4 недели назад, чтобы отобразить отутствия
				SELECT *
				FROM (SELECT 'ago1w' AS tp 
						UNION SELECT 'ago2w' AS tp
						UNION SELECT 'ago3w' AS tp
						UNION SELECT 'ago4w' AS tp) tp 
				JOIN (SELECT DISTINCT c.name, c.short_name, c.no_stat FROM calculation c) dsn ON 1=1
				) AS dict 
			LEFT JOIN calculation c ON dict."name" = c."name" AND c.time_per = dict.tp
			ORDER BY 1, 2, 4
			)
			SELECT 
				name as short_name,
				short_name as head,
				no_stat,
				json_agg (late_cnt) AS late_cnt,
				json_agg (all_cnt) AS all_cnt,
				json_agg(avg_time) AS avg_time,
				json_agg (avg_time_percent) AS avg_time_percent,
				max (case when time_per = 'ago1w' then sum_working_time else 0 end) AS cnt_state
			FROM preselect
			GROUP BY 1, 2, 3
			ORDER BY name;
		`,
			[startDate, endDate, department]
		)
		return employees_data
	}
	async getPerson(startDate, endDate, person) {
		console.log(startDate, endDate, person)
		const person_data = await postgres.query(
			`
			SELECT
				wm."name" ,
				round (extract (hour from (sum (working_time)+interval '30 minutes')), 0) as sum_working_time,
				COUNT (late_time) AS late_cnt,
				COUNT (1) AS all_cnt,
				round (extract (epoch from sum (wm.working_time)) / extract (epoch from 
					sum (case when (extract (dow from wm."date") = 5) or (extract (month from wm."date") * 100 + extract (day from wm."date") in (222,307,428,505,1103)) 
					then e.end_wd - e.start_wd - interval '2 hour 15 minutes' else e.end_wd - e.start_wd - interval '45 minutes' end) ) * 100 , 0) AS avg_working_time ,
				round (avg (wm.work_time_zone), 0) AS round
			FROM dds.work_mart wm
			left join dds.employees e on e.name = wm.name
			WHERE
				"date" between date($1) and date($2)
			and (wm."name" like ('%' || $3 || '%'))
			GROUP BY wm."name";
		`,
			[startDate, endDate, person]
		)
		return person_data
	}
	async getLeader(startDate, endDate, leader) {
		const leader_data = await postgres.query(
			`
			SELECT
				d.short_name  ,
				e."name" ,
				COUNT (late_time) AS late_cnt,
				COUNT (1) AS all_cnt,
				round ((extract(epoch from (date_trunc('second', avg (wm.working_time)))) / extract (epoch from time '08:00')* 100), 2) AS avg_working_time ,
				round (avg (wm.work_time_zone), 2) AS round
			FROM dds.work_mart wm
			LEFT JOIN dds.departments d ON d.short_name = wm.parent_dept
			LEFT JOIN dds.employees e ON e.dept_id = d.dept_id
			left join dds.employees e2 on e2."name" = wm."name"
			WHERE date between date($1) and date($2)
				AND e."name" LIKE ('%' || $3 || '%')
				and e2.no_stat = False
			GROUP BY d.short_name, e."name"
		`,
			[startDate, endDate, leader]
		)
		return leader_data
	}
}

export default new WorktimeRepository()
