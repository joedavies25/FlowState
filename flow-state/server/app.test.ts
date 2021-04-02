import app from './app';
import request from 'supertest';
import connection from './model/index';

describe('Request', () => {

  beforeAll(async () => {
    await connection;
  });

  afterAll(() => {
    connection.disconnect();
  });

  it('get /stations should response the GET method', () => {
    // const res = await request(app).get('/stations');
    // expect(res.status).toBe(200);
    return request(app)
      .get('/stations')
      .then(response => {
        expect(response.status).toBe(200);
      });
  });

  it('get /saved should response the GET method', () => {
    return request(app)
      .get('/saved')
      .then(response => {
        expect(response.status).toBe(200);

      });
  });

  it('post /removeSaved should remove measure from saved and response with ', () => {
    return request(app)
      .post('/removeSaved')
      .send({
        stationID: 'http://environment.data.gov.uk/flood-monitoring/id/measures/1090_w2TH-level-stage-i-15_min-mASD',
        qualifier: 'Stage',
        unitName: 'mASD'
      })
      .then(response => {
        expect(response.status).toBe(201);
      });
  });

  it('post /saved should save new measure and return 201', () => {
    return request(app)
      .post('/saved')
      .send({
        stationID: 'http://environment.data.gov.uk/flood-monitoring/id/measures/1090_w2TH-level-stage-i-15_min-mASD',
        qualifier: 'Stage',
        unitName: 'mASD'
      })
      .then(response => {
        expect(response.status).toBe(201);
      });
  });

  it('post /saved should return 500 if meausure already saved', () => {
    return request(app)
      .post('/saved')
      .send({
        stationID: 'http://environment.data.gov.uk/flood-monitoring/id/measures/1090_w2TH-level-stage-i-15_min-mASD',
        qualifier: 'Stage',
        unitName: 'mASD'
      })
      .then(response => {
        expect(response.status).toBe(500);
      });
  });

});