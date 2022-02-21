// import { Pool } from "pg";


const Pool = require('pg-pool');
const pool = new Pool({
    user: 'postgres',
    host: 're-source-1-instance-1.c9itwz8vqblz.us-east-1.rds.amazonaws.com',
    database: 'Re(Sources)',
    password: 'ressource',
    port: 5432,
    // connectionString: "postgres://postegres:ressource@re-source-1-instance-1.c9itwz8vqblz.us-east-1.rds.amazonaws.com",
    // ssl: {
    //     rejectUnauthorized: false
    // }
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM "Compte"', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}

const getUserById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM "Compte" WHERE "idCompte" = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        // response.status(200).json(results.rows);
        // var reponse = Response.redirect(url,status);
        reponse.redirect('/users', 200);
    })
}

const createUser = (request, response) => {
    const { name, email } = request.body

    pool.query('INSERT INTO "Compte" (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
        if (error) {
            throw error
        }
        response.status(201).send(`User added with ID: ${result.insertId}`)
    })
}

const updateUsers = (request, response) => {
    const { name } = request.body;
    console.log(name);
    pool.query('INSERT INTO "Compte" ("nomUtilisateur") VALUES ($1)', [name], (error, results) => {
        if (error) {
            throw error
        }        
        // response.status(200).json(results.rows);
        response.redirect('/users');
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUsers
}