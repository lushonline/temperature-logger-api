/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const consola = require('consola');

const db = require('./models');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/static')));

app.get('/api/readings', (req, res) => {
  // TODO: find all the readings for specified id
  db.Reading.findAll({
    order: [['id', 'DESC']],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving readings.',
      });
    });
});

app.get('/api/readings/:sensorid', (req, res) => {
  const sensorId = req.params.sensorid;
  // TODO: find all the readings for specified id
  db.Reading.findAll({
    order: [['id', 'DESC']],
    where: { sensorId },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving readings.',
      });
    });
});

app.get('/api/readings/:sensorid/latest', (req, res) => {
  const sensorId = req.params.sensorid;
  // TODO: find the latest reading for specified id
  db.Reading.findOne({
    order: [['id', 'DESC']],
    where: { sensorId },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving readings.',
      });
    });
});

db.sequelize
  .authenticate({
    logging: process.env.NODE_ENV === 'production' ? false : consola.log,
  })
  .then(() => {
    consola.log(`Connection has been established successfully. SQLITE3 DB: ${db.config.storage}`);
    app.listen(port, () => {
      consola.log(`Server is up on port ${port}`);
    });
  })
  .catch((err) => {
    consola.error('Unable to connect to the database:', err);
    process.exit(1);
  });
