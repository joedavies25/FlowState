import apiservice from '../apiservice';

describe('testing api', () => {
  beforeEach(() => {
    fetch.resetMocks()
  })

  it('calls getstations and returns data to me', async () => {
    fetch.mockResponseOnce(JSON.stringify([{
      "measures": [
          {
              "_id": "604a4f7efd7d50f4eecaee32",
              "stationID": "http://environment.data.gov.uk/flood-monitoring/id/measures/E8266-level-stage-i-15_min-mASD",
              "qualifier": "Stage",
              "unitName": "mASD"
          }
      ],
      "_id": "604a4f7efd7d50f4eecaee31",
      "latitude": 51.038451,
      "longitude": -0.100268,
      "__v": 0
  }]));

    //assert on the response
    const res = await apiservice.getStations();
    // console.log('RES DATA', res);
    expect(res).toEqual([{
      "measures": [
          {
              "_id": "604a4f7efd7d50f4eecaee32",
              "stationID": "http://environment.data.gov.uk/flood-monitoring/id/measures/E8266-level-stage-i-15_min-mASD",
              "qualifier": "Stage",
              "unitName": "mASD"
          }
      ],
      "_id": "604a4f7efd7d50f4eecaee31",
      "latitude": 51.038451,
      "longitude": -0.100268,
      "__v": 0
  }])

    //assert on the times called and arguments given to fetch
    expect(fetch.mock.calls.length).toEqual(1);
    expect(global.fetch).toHaveBeenCalledTimes(1);
  })
})