import { model, Schema } from 'mongoose';
import { IMeasureDocument } from '../interfaces/measure.interfaces';

const MeasureSchema: Schema = new Schema({
  stationID: String,
  qualifier: String,
  unitName: String,
});

export default model<IMeasureDocument>('Measure', MeasureSchema);
