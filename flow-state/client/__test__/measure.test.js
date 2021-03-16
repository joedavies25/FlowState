import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';
import fetchMock from 'jest-fetch-mock';
import Measure from '../components/measure';
import { act, fireEvent, render } from '@testing-library/react-native';
import apiService from '../apiservice';

jest.useFakeTimers();
jest.mock('../apiService.ts', () => {
  return {
    getMeasureInfo: jest.fn(),
    getLastestReading: jest.fn(),
    convertFromMASD: jest.fn(),
  };
});

describe.only('Testing togglesave button', () => {
  it('should check if life cycle runs', async () => {
    apiService.getLastestReading.mockResolvedValue(0.255);
    apiService.convertFromMASD.mockResolvedValue(0.487);
    const promise = Promise.resolve('RIVER DIKLER AT BOURTON ON THE WATER');

    apiService.getMeasureInfo.mockResolvedValue(promise);
    const component = renderer.create(
      <Measure
        stationID={
          'http://environment.data.gov.uk/flood-monitoring/id/measures/E8266-level-stage-i-15_min-mASD'
        }
        unitName={'mASD'}
        qualifier={'Staged'}
        saved={true}
      />,
    );
    await act(() => promise);
    expect(apiService.getLastestReading).toHaveBeenCalled();
    expect(apiService.convertFromMASD).toHaveBeenCalled();
    expect(apiService.getMeasureInfo).toHaveBeenCalled();
  });
});
