const Station = require('../model/stationSchema');

exports.getStations = async (_, res) => {
  try {
    const result = await Station.find();
    res.status(200);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send(e);
  }
};

exports.postStation = async (req, res) => {
  try {
    await Station.create(req.body);
    res.status(201);
    res.send('Created ' + req.body.stationID);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send(e);
  }
};
