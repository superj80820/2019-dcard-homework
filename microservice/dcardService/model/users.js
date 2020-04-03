const ow = require('ow')
const { Pool } = require('pg')

const pgOptions = {
  host: process.env.PG_ENDPOINT,
  port: process.env.PG_PORT,
  database: process.env.PG_SQL_DATABASE,
  user: process.env.PG_SQL_USER,
  password: process.env.PG_SQL_PASSWORD,
  max: 5,
  idleTimeoutMillis: 5000,
  ssl: false,
  connectionTimeoutMillis: 10000
}

const pgPool = new Pool(pgOptions)
pgPool.on('error', function (err) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error(`postgresSQL error: ${err}`)
})

const _promisePgPoolQuery = (sql, sqlParams) => new Promise(resolve => {
  pgPool.query(sql, sqlParams, (err, result) => {
    return (err) ? resolve([null, err]) : resolve([result, null])
  })
})

async function createUser (columns , promisePgPoolQueryHandler = _promisePgPoolQuery) {
  ow(columns, ow.object.exactShape({
    name: ow.string,
    birthday: ow.string,
    socialize: ow.string,
    school: ow.string,
    department: ow.string,
    interestsAndExpertise: ow.string,
    club: ow.string,
    course: ow.string,
    country: ow.string,
    troubles: ow.string,
    exchangeable: ow.string,
    trying: ow.string
  }))
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
  return await promisePgPoolQueryHandler(sql, params)
}

async function queryUserByRandom (promisePgPoolQueryHandler = _promisePgPoolQuery) {
  const sql = `
    SELECT * FROM users  
    ORDER BY random()
    LIMIT 1
  `
  const params = []
  return await promisePgPoolQueryHandler(sql, params)
}

module.exports = {
  createUser,
  queryUserByRandom
}