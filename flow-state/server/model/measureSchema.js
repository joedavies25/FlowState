const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MeasureSchema = new Schema({
  stationID: String,
  qualifier: String,
  unitName: String,
});

module.exports = mongoose.model('Measure', MeasureSchema);
