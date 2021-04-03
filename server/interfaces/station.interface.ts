import { Document } from 'mongoose';
import IMeasure from './measure.interfaces';

export default interface IStation {
  latitude: number;
  longitude: number;
  measures: IMeasure[];
}

export interface IStationDocument extends IStation, Document {}
