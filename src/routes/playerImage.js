const express = require('express');

const router = express.Router();
const playerImage = require('../controllers/playerImage');
router.get('/', playerImage);
module.exports = router;
