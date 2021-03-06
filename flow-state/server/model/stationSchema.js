const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeasureSchema = new Schema({
  stationID: String,
  qualifier: String,
  unitName: String,
});

const StationSchema = new Schema({
  latitude: Number,
  longitude: Number,
  measures: [],
});

module.exports = mongoose.model('Station', StationSchema);
// exports.Station = mongoose.model('Station', StationSchema);
// exports.Measure = mongoose.model('Measure', MeasureSchema);
