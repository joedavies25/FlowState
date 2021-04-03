import { Document } from 'mongoose';

export default interface IMeasure {
  stationID: string;
  qualifier: string;
  unitName: string;
};

export interface IMeasureDocument extends IMeasure, Document {}
