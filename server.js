require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');

const { mongoose } = require('./db/mongoose');
const { TodoController } = require('./controllers/todo.controller');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/todo', TodoController.get);

app.post('/todo', TodoController.post);

app.get('/todo/:id', TodoController.getById);

app.delete('/todo/:id', TodoController.delete);

app.patch('/todo/:id', TodoController.patch);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = { app };