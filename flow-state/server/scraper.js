const fetch = require('node-fetch');
const Schemas = require('./model/stationSchema');
const Station = require('./model/stationSchema');
const Measure = require('./model/measureSchema');
const connection = require('./model/index');

const scraper = async () => {
  const result = await fetch(
    'https://environment.data.gov.uk/flood-monitoring/id/stations?_limit=50',
  ).then((res) => res.json());

  result.items.map(async (station, idx) => {
    let newStation = new Station({ 
      latitude: station.lat,
      longitude: station.long,
      measures: [],
    });
    station.measures.forEach((measure) => {
      let newMeasure = new Measure({
        stationID: measure['@id'],
        qualifier: measure.qualifier,
        unitName: measure.unitName,
      });
      newStation.measures.push(newMeasure);
    });
    await Station.create(newStation);
  });
};

(async () => {
  try {
    await connection;
    console.log('connected.database');
    await scraper();
    console.log('done');
  } catch (err) {
    console.log(err);
  }
})();
