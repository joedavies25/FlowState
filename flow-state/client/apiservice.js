// const BASE_URL = 'http://10.10.22.29:3001';
// require('dotenv').config();
const BASE_URL = process.env.EXPO_BASE_URL;

exports.getStations = async (hookFunc) => {
  const result = await fetch(BASE_URL + '/stations')
    .then((res) => res.json())
    .catch((err) => console.log(err));
  hookFunc(result);
};

exports.getSaved = async (hookFunc) => {
  const result = await fetch(BASE_URL + '/saved')
    .then((res) => res.json())
    .catch((err) => console.log(err));
  hookFunc(result);
};

exports.addSaved = async (measure) => {
  return fetch(BASE_URL + '/saved', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(measure),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

exports.removeSaved = async (id) => {
  return fetch(BASE_URL + '/removeSaved', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(id),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

exports.getMeasureInfo = async (id) => {
  return fetch(id)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

exports.getLastestReading = (id) => {
  return fetch(
    `http://environment.data.gov.uk/flood-monitoring/id/measures/${id}/readings?latest`,
  )
    .then((res) => res.json())
    .then((res) => res.items[0].value)
    .catch((err) => console.log(err));
};

exports.convertFromMASD = (id) => {
  return fetch(
    `http://environment.data.gov.uk/flood-monitoring/id/stations/${id}`,
  )
    .then((res) => res.json())
    .then((res) => res.items.stageScale.minOnRecord.value)
    .catch((err) => console.log(err));
};
