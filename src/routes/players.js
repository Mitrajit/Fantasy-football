const express = require('express');

const router = express.Router();
const controller = require('../controllers/players');

router.get('/', controller.players);

router.get('/best', controller.best);

module.exports = router;
