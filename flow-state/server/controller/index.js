const Station = require('../model/stationSchema');
const Measure = require('../model/measureSchema');

exports.getStations = async (_, res) => {
  try {
    const result = await Station.find();
    res.status(200);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
};

exports.postStation = async (req, res) => {
  try {
    await Station.create(req.body);
    res.status(201);
    res.send('Created ' + req.body.stationID);
  } catch (err) {
    handleError(err, res);
  }
};

exports.getMeasures = async (_, res) => {
  try {
    const result = await Measure.find();
    res.status(200);
    res.send(result);
  } catch (err) {
    handleError(err, res);
  }
};

exports.saveMeasure = async (req, res) => {
  try {
    await Measure.create(req.body);
    res.status(201);
    res.send('Created ' + req.body.stationID);
  } catch (err) {
    handleError(err, res);
  }
};

exports.removeMeasure = async (req, res) => {
  try {
    await Measure.findOneAndDelete({ stationID: req.body.stationID });
    res.status(201);
    res.send('Deleted');
  } catch (err) {
    handleError(err, res);
  }
};

const handleError = (err, res) => {
  console.log(err);
  res.status(500);
  res.send(err);
};
