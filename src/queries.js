// import { Pool } from "pg";
require('dotenv').config();

const Pool = require('pg-pool');
const pool = new Pool({
    user: 'zmbvngajlkmudl',
    host: 'ec2-3-225-79-57.compute-1.amazonaws.com',
    database: 'dec6ngf50lhrha',
    password: '29d4d2dddff5ffa32b1bc8b09bce05989e41f1c8c26f27a0d58fbbbbb938d19c',
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

const addUsers = (request, response) => {
    const nomUtilisateur="Elies"
    pool.query('INSERT INTO "Compte" ("nomUtilisateur") VALUES ($1)', [nomUtilisateur], (error, results) => {
        if (error) {
            throw error
        }        
        response.status(304).json(results.rows)
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

// const motDePasseUtilisateur="mdptest";
// const hash=bcrypt.hashSync(motDePasseUtilisateur,1);


// console.log(motDePasseUtilisateur);
// console.log(hash);


// const comparaisonMdp= bcrypt.compare(motDePasseUtilisateur, hash, function(err, res){
//     if (res) console.log('Le MDP est bueno'); 
//     if (err) console.log('erreur de mot de passe');
//     return;
// })

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUsers,
    addUsers
}