import { model, Schema } from 'mongoose';
import { IStationDocument } from '../interfaces/station.interface';

const StationSchema = new Schema({
  latitude: Number,
  longitude: Number,
  measures: [],
});

export default model<IStationDocument>('Station', StationSchema);
// exports.Station = mongoose.model('Station', StationSchema);
// exports.Measure = mongoose.model('Measure', MeasureSchema);
