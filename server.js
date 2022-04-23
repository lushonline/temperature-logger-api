/* eslint-disable no-unused-vars */
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const consola = require('consola');

const db = require('./models');

const readings = require('./routes/readings');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/static')));

// register routes
app.use('/api/readings', readings);

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
