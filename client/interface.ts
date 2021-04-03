export interface iStation {
  _id: string;
  measures: Array<iMeasure>;
  latitude: number;
  longitude: number;
}

export interface iMeasure {
  _id: string;
  stationID: string;
  qualifier: string;
  unitName: string;
  saved?: boolean;
}

// export interface iSavedMeasure {
//   id: string;
//   stationID: string;
//   qualifier: string;
//   unitName: string;
//   saved?: boolean;
// }
