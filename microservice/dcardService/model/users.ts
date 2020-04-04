import { Pool } from "pg";

interface Columns {
  name: string,
  birthday: string,
  socialize: string,
  school: string,
  department: string,
  interestsAndExpertise: string,
  club: string,
  course: string,
  country: string,
  troubles: string,
  exchangeable: string,
  trying: string
}

const pgPool = new Pool({
  host: process.env.PG_ENDPOINT,
  port: parseInt(process.env.PG_PORT),
  database: process.env.PG_SQL_DATABASE,
  user: process.env.PG_SQL_USER,
  password: process.env.PG_SQL_PASSWORD,
  max: 5,
  idleTimeoutMillis: 5000,
  ssl: false,
  connectionTimeoutMillis: 10000
})

pgPool.on('error', function (err) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error(`postgresSQL error: ${err}`)
})

const _promisePgPoolQuery = (sql: string, sqlParams: any[]): Promise<any[]> => {
  return new Promise(resolve => {
    pgPool.query(sql, sqlParams, (err, result) => {
      return (err) ? resolve([null, err]) : resolve([result, null])
    })
  })
}

async function createUser (columns: Columns, promisePgPoolHandler = _promisePgPoolQuery) {
  const sql = `
    INSERT INTO users (name, birthday, socialize, school, department, "interestsAndExpertise", club, course, country, troubles, exchangeable, trying)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12);
  `
  const params = [
    columns.name,
    columns.birthday,
    columns.socialize,
    columns.school,
    columns.department,
    columns.interestsAndExpertise,
    columns.club,
    columns.course,
    columns.country,
    columns.troubles,
    columns.exchangeable,
    columns.trying
  ]
  return await promisePgPoolHandler(sql, params)
}

async function queryUserByRandom (promisePgPoolHandler = _promisePgPoolQuery) {
  const sql = `
    SELECT * FROM users  
    ORDER BY random()
    LIMIT 1
  `
  const params = []
  return await promisePgPoolHandler(sql, params)
}

export {
  createUser,
  queryUserByRandom
}
