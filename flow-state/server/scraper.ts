import fetch from 'node-fetch';
import Station from './model/stationSchema';
import Measure from './model/measureSchema';
import connection from './model/index';
import IStation from './interfaces/station.interface';
import IMeasure from './interfaces/measure.interfaces';

type FetchStation = {
  lat: number;
  long: number;
  measures: FetchMeasure[];
};

type FetchMeasure = {
  '@id': string;
  qualifier: string;
  unitName: string;
};

const scraper = async () => {
  const result = await fetch(
    'https://environment.data.gov.uk/flood-monitoring/id/stations?_limit=50',
  ).then((res) => res.json());

  result.items.map(async (station: FetchStation) => {
    const newStation: IStation = new Station({
      latitude: station.lat,
      longitude: station.long,
      measures: [],
    });
    station.measures.forEach((measure: FetchMeasure) => {
      const newMeasure: IMeasure = new Measure({
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
