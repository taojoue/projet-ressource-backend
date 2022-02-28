const db = require('./queries');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1234;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});

app.get('/users', db.getUsers);
app.get('/addUsers', db.addUsers);
// app.get('/users/:id', db.getUserById);
// app.get('/updateUsers/:name', db.updateUsers);
app.get('/updateUsers', db.updateUsers);
app.get('/getNbrCommentaires', db.getNbrCommentaires);
app.get('/addRessources', db.addRessources);
app.get('/deleteRessources', db.deleteRessources);
app.get('/getRessources', db.getRessources);
app.get('/updateRessources', db.updateRessources);
