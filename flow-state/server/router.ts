import experss from 'express';
const router = experss.Router();
import stationController from './controller/station.controller';
import measureController from './controller/measure.controller';

router.get('/stations', stationController.getStations);
// router.post('/stations', stationController.postStation);

router.get('/saved', measureController.getMeasures);
router.post('/saved', measureController.saveMeasure);
router.post('/removeSaved', measureController.removeMeasure);

export default router;
