// import { Pool } from "pg";
require('dotenv').config();

const Pool = require('pg-pool');
const pool = new Pool({
    user: 'zmbvngajlkmudl',
    host: 'ec2-3-225-79-57.compute-1.amazonaws.com',
    database: 'dec6ngf50lhrha',
    password: '29d4d2dddff5ffa32b1bc8b09bce05989e41f1c8c26f27a0d58fbbbbb938d19c',
    port: 5432,
    connectionString: "postgres://zmbvngajlkmudl:29d4d2dddff5ffa32b1bc8b09bce05989e41f1c8c26f27a0d58fbbbbb938d19c@ec2-3-225-79-57.compute-1.amazonaws.com:5432/dec6ngf50lhrha",
    ssl: {
        rejectUnauthorized: false
    }
});

const message = console.log('Test bonjour');

const getUsers = (request, response) => {
    pool.query('SELECT * FROM compte', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
    })
}

// const getUserById = (request, response) => {
//     const id = parseInt(request.params.id)

//     pool.query('SELECT * FROM "Compte" WHERE "idCompte" = $1', [id], (error, results) => {
//         if (error) {
//             throw error;
//         }
//         // response.status(200).json(results.rows);
//         // var reponse = Response.redirect(url,status);
//         reponse.redirect('/users', 200);
//     })
// }

// const createUser = (request, response) => {
//     const { name, email } = request.body

//     pool.query('INSERT INTO "Compte" (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
//         if (error) {
//             throw error
//         }
//         response.status(201).send(`User added with ID: ${result.insertId}`)
//     })
// }

const addUsers = (request, response) => {
    const prenomUtilisateur="Elies";
    const nomUtilisateur="TEST";
    const pseudoUtilisateur="elitesto";
    const mdpUtilisateur="1234567890";

    pool.query('INSERT INTO compte ("prenomUtilisateur","nomUtilisateur","pseudoUtilisateur","mdpUtilisateur") VALUES ($1,$2,$3,$4) RETURNING * ', [prenomUtilisateur,nomUtilisateur,pseudoUtilisateur,mdpUtilisateur], (error, results) => {
        if (error) {
            throw error
        }        
        response.status(200).json(results.rows)
    })
}


const updateUsers = (request, response) => {
    const nouveauPrenom="WWWWWWAAAAAAAAAAAAEEEEEEEEEEE";
    pool.query('UPDATE compte SET "prenomUtilisateur" = $1 WHERE "idCompte"=2 RETURNING "idCompte", "prenomUtilisateur", NOW() ', [nouveauPrenom], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
        // response.redirect('/users')
    })
}

const getNbrCommentaires = (request, response) => {
    const idUser="2";
    pool.query('SELECT count(commentaire."idCommentaire") FROM commentaire, compte WHERE compte."idCompte"=$1', [idUser], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows);
        // response.redirect('/users')
    })
}
// const updateUsers2 = (request, response) => {
//     const { name } = request.body;
//     console.log(name);
//     pool.query('INSERT INTO "Compte" ("nomUtilisateur") VALUES ($1)', [name], (error, results) => {
//         if (error) {
//             throw error
//         }        
//         // response.status(200).json(results.rows);
//         response.redirect('/users');
//     })
// }



// const motDePasseUtilisateur="mdptest";
// const motDePasseCrypte = bcrypt.hashSync(motDePasseUtilisateur,1);

// console.log(motDePasseUtilisateur);
// console.log(motDePasseCrypte);

// const comparaisonMdp= bcrypt.compare(motDePasseUtilisateur, motDePasseCrypte, function(err, res){
//     if (res) console.log('Le MDP est bueno'); 
//     if (err) console.log('erreur de mot de passe');
//     return;
// })

module.exports = {
    message,
    pool,
    getUsers,
    //getUserById,
    //createUser,
    updateUsers,
    addUsers,
    getNbrCommentaires
}