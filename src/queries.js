const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgre',
    host: 're-source-1-instance-1.c9itwz8vqblz.us-east-1.rds.amazonaws.com',
    database: 're-source-1',
    password: 'ressource',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "Compte"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers,
}