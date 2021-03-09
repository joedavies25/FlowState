const express = require('express');
const controller = require('./controller/index');
const router = express.Router();

router.get('/stations', controller.getStations);
router.post('/stations', controller.postStation);
router.get('/saved', controller.getMeasures);
router.post('/saved', controller.saveMeasure);
router.post('/removeSaved', controller.removeMeasure);

module.exports = router;
