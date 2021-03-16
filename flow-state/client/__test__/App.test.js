// __tests__/Intro-test.js
import React from 'react';
import renderer from 'react-test-renderer';
import fetchMock from 'jest-fetch-mock';
import App from '../App';

jest.useFakeTimers();

const BASE_URL = process.env.EXPO_BASE_URL;
fetchMock.enableMocks();

fetchMock.mockIf(BASE_URL, (req) => {
  if (req.url.endsWith('/stations')) {
    return [
      {
        measures: [
          {
            _id: '604a4f7efd7d50f4eecaee32',
            stationID:
              'http://environment.data.gov.uk/flood-monitoring/id/measures/E8266-level-stage-i-15_min-mASD',
            qualifier: 'Stage',
            unitName: 'mASD',
          },
        ],
        _id: '604a4f7efd7d50f4eecaee31',
        latitude: 51.038451,
        longitude: -0.100268,
        __v: 0,
      },
    ];
  } else {
    return {
      status: 404,
      body: 'Not Found',
    };
  }
});

describe.skip('<App />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(2);
  });
});
