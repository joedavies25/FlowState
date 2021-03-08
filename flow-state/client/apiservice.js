const BASE_URL = 'http://192.168.0.195:3001/stations';

exports.getStations = async (hookFunc) => {
  const result = await fetch(BASE_URL)
    .then((res) => res.json())
    .catch((err) => console.log(err));
  hookFunc(result);
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
