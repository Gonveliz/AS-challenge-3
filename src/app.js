require('dotenv').config();

// Inicialización de Datadog tracer
const tracer = require('dd-trace').init({
  service: 'challenge-service', // Nombre descriptivo de tu servicio
  env: 'dev'
});

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const { connectDB } = require('./config/db');

const app = express(); // Asegúrate de que `app` esté definido antes de usarlo

// Connect Database
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta de prueba para la raíz
app.get('/', (req, res) => {
  res.status(200).send('App funcionando. version:1.2.3');
});

// for testing purposes
app.get('/test', (req, res) => {
  res.status(200).send({ text: 'Simple Node App Working!' });
});

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;
