const express = require('express');
const controller = require('./controller/index');
const router = express.Router();

router.get('/stations', controller.getStations);
router.post('/stations', controller.postStation);

module.exports = router;
