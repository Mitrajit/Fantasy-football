// Configure a express router
const express = require('express');

const router = express.Router();
const controller = require('../controllers/operator');

router.get('/operator', controller.operator);

router.get('/operatorGameType', controller.operatorGameType);

router.get('/operatorName', controller.operatorName);

module.exports = router;
