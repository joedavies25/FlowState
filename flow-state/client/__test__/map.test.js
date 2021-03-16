import React from 'react';
import renderer from 'react-test-renderer';
import Map from '../screens/map';
import apiService from '../apiservice';
import SplashScreen from '../animations/waterLoader';
import MapView from 'react-native-map-clustering';
import { View, Text } from 'react-native';
import { act, screen, fireEvent, render } from '@testing-library/react-native';

jest.useFakeTimers();

jest.mock('../apiService.ts', () => {
  return {
    getStations: jest.fn()
  };
});

//react-native-maps is rendering a native component, which needs to be mocked out
//used Component instead of a Functional component because of this warning:
//Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()
jest.mock('react-native-maps', () => {
  const { Component } = require('react');
  const { View, Text } = require('react-native');
  class MockMapView extends Component {
    render() {
      return <View testID={'map'}>{this.props.children}</View>;
    }
  }
  class MockMarker extends Component {
    render() {
      return <View testID={'marker'}><Text>Marker</Text></View>;
    }
  }
  const mockMapTypes = {
    STANDARD: 0,
    SATELLITE: 1,
    HYBRID: 2,
    TERRAIN: 3,
    NONE: 4,
    MUTEDSTANDARD: 5,
  };
  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMarker,
    MAP_TYPES: mockMapTypes,
    PROVIDER_DEFAULT: 'default',
    PROVIDER_GOOGLE: 'google',
  };
});

// apiService.getStations = async () => {
//   return promise;
// }
// apiService.getStations = jest.fn(() => promise);
describe('Map screen', () => {

  it('should call api request to get stations and render map with markers', async () => {
    const promise = Promise.resolve([
      {
          measures: [
              {
                  _id: "604a4f7efd7d50f4eecaee32",
                  stationID: "http://environment.data.gov.uk/flood-monitoring/id/measures/E8266-level-stage-i-15_min-mASD",
                  qualifier: "Stage",
                  unitName: "mASD"
              }
          ],
          _id: "604a4f7efd7d50f4eecaee31",
          latitude: 51.038451,
          longitude: -0.100268
      }, 
      {
        measures: [
            {
                _id: "604a4f7efd7d50f4eecaee34",
                stationID: "http://environment.data.gov.uk/flood-monitoring/id/measures/1771TH-level-stage-i-15_min-mASD",
                qualifier: "Stage",
                unitName: "mASD"
            }
        ],
        _id: "604a4f7efd7d50f4eecaee33",
        latitude: 51.571482,
        longitude: -1.449342
    }]);
    apiService.getStations.mockResolvedValue(promise);
    const component = render(<Map />);
    await act(() => promise);
    expect(apiService.getStations).toHaveBeenCalled();
    expect(component.getAllByTestId('marker').length).toBe(2);
    // component.debug();
    // console.log('found markers', component.root.findAllByProps({testID: 'marker'}).length);
  });

})