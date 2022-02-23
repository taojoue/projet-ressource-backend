const db = require('./queries');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const michel = "michel";

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
app.get('/users/:id', db.getUserById);
app.get('/updateUsers/:name', db.updateUsers);