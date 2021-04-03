import { iStation, iMeasure } from './interface';
// import dotenv from 'dotenv';

// dotenv.config();
const BASE_URL = process.env.EXPO_BASE_URL;

function getStations(): Promise<iStation[]> {
  return fetch(`${BASE_URL}/stations`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
// const getStations = async (): Promise<Array<iStation>> => {
//   const result = await fetch(`${BASE_URL}/stations`)
//     .then((res) => res.json())
//     .catch((err) => console.log(err))
// };

function getSaved(): Promise<iMeasure[]> {
  return fetch(`${BASE_URL}/saved`)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
// exports.getSaved = async (hookFunc) => {
//   const result = await fetch(EXPO_BASE_URL + '/saved')
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
//   hookFunc(result);
// };

function addSaved(measure: {
  stationID: string;
  qualifier: string;
  unitName: string;
}): Promise<string> {
  return fetch(`${BASE_URL}/saved`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(measure),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
// exports.addSaved = async (measure) => {
//   return fetch(EXPO_BASE_URL + '/saved', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(measure),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// };

function removeSaved(id: any): Promise<any> {
  return fetch(`${BASE_URL}/removeSaved`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}
// exports.removeSaved = async (id) => {
//   return fetch(EXPO_BASE_URL + '/removeSaved', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(id),
//   })
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// };

function getMeasureInfo(id: string): Promise<string> {
  return fetch(id)
    .then((res) => res.json())
    .then((res) => res.items.label.split('-')[0])
    .catch((err) => console.log(err));
}
// exports.getMeasureInfo = async (id) => {
//   return fetch(id)
//     .then((res) => res.json())
//     .catch((err) => console.log(err));
// };

function getLastestReading(id: string): Promise<number> {
  return fetch(
    `http://environment.data.gov.uk/flood-monitoring/id/measures/${id}/readings?latest`,
  )
    .then((res) => res.json())
    .then((res) => res.items[0].value)
    .catch((err) => console.log(err));
}
// exports.getLastestReading = (id) => {
//   return fetch(
//     `http://environment.data.gov.uk/flood-monitoring/id/measures/${id}/readings?latest`,
//   )
//     .then((res) => res.json())
//     .then((res) => res.items[0].value)
//     .catch((err) => console.log(err));
// };

function convertFromMASD(id: string): Promise<number> {
  return fetch(
    `http://environment.data.gov.uk/flood-monitoring/id/stations/${id}`,
  )
    .then((res) => res.json())
    .then((res) => res.items.stageScale.minOnRecord.value)
    .catch((err) => console.log(err));
}
// exports.convertFromMASD = (id) => {
//   return fetch(
//     `http://environment.data.gov.uk/flood-monitoring/id/stations/${id}`,
//   )
//     .then((res) => res.json())
//     .then((res) => res.items.stageScale.minOnRecord.value)
//     .catch((err) => console.log(err));
// };

export default {
  getStations,
  getSaved,
  getMeasureInfo,
  getLastestReading,
  convertFromMASD,
  removeSaved,
  addSaved,
};
