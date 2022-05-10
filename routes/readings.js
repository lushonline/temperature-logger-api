const express = require('express');
const moment = require('moment');

const db = require('../models');

const router = express.Router();

router.get('/', (req, res) => {
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

router.get('/:sensorId', (req, res) => {
  const { sensorId } = req.params;
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

router.get('/:sensorId/latest', (req, res) => {
  const { sensorId } = req.params;
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

router.get('/:sensorId/today', (req, res) => {
  const { sensorId } = req.params;
  // TODO: find todays data for specified id
  const { Op } = db.Sequelize;
  const TODAY_START = moment().utc().startOf('day');
  const NOW = moment().utc().endOf('day');

  db.Reading.findAll({
    order: [['id', 'DESC']],
    where: {
      createdAt: {
        [Op.between]: [TODAY_START, NOW],
      },
      sensorId,
    },
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

router.get('/:sensorId/:start/:end?', (req, res) => {
  const { sensorId, start, end } = req.params;
  // TODO: find todays data for specified id
  const { Op } = db.Sequelize;
  const DATE_START = moment.tz(start, 'Z').startOf('day');
  const DATE_END = end ? moment.tz(end, 'Z').endOf('day') : moment.tz(start, 'Z').endOf('day');

  db.Reading.findAll({
    order: [['id', 'DESC']],
    where: {
      createdAt: {
        [Op.between]: [DATE_START, DATE_END],
      },
      sensorId,
    },
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

module.exports = router;
