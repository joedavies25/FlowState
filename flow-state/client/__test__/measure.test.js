import React from 'react';
import renderer from 'react-test-renderer';
import { Text, View } from 'react-native';
import Measure from '../components/measure';
import { act, fireEvent } from '@testing-library/react-native';
import apiService from '../apiservice';
import { AntDesign } from '@expo/vector-icons';
const BASE_URL = process.env.EXPO_BASE_URL;

jest.useFakeTimers();

jest.mock('../apiService.ts', () => {
  return {
    getMeasureInfo: jest.fn(),
    getLastestReading: jest.fn(),
    convertFromMASD: jest.fn(),
    removeSaved: jest.fn(),
    addSaved: jest.fn(),
  };
});

describe.only('Testing togglesave button', () => {
  let component;
  beforeEach(async () => {
    const removed = Promise.resolve({ removed: 'removed' });
    const added = Promise.resolve({ added: 'added' });
    apiService.getLastestReading.mockResolvedValue(0.255);
    apiService.convertFromMASD.mockResolvedValue(0.487);
    const promise = Promise.resolve('RIVER DIKLER AT BOURTON ON THE WATER');

    apiService.removeSaved.mockResolvedValue(removed);
    apiService.addSaved.mockResolvedValue(added);
    apiService.getMeasureInfo.mockResolvedValue(promise);
    component = renderer.create(
      <Measure
        stationID={
          'http://environment.data.gov.uk/flood-monitoring/id/measures/E8266-level-stage-i-15_min-mASD'
        }
        unitName={'mASD'}
        qualifier={'Staged'}
        saved={true}
        handleClick={() => {}}
      />,
    );
    await act(() => promise);
  });

  it('should check if life cycle runs', () => {
    expect(apiService.getLastestReading).toHaveBeenCalled();
    expect(apiService.convertFromMASD).toHaveBeenCalled();
    expect(apiService.getMeasureInfo).toHaveBeenCalled();
  });

  it('should check if measure renders correct elements', () => {
    expect(component.root.findAllByType(View).length).toBe(1);
    expect(component.root.findAllByType(Text).length).toBe(3);
    expect(component.root.findAllByType(AntDesign).length).toBe(1);
  });

  it('should check if click changes icon', async () => {
    expect(component.root.findByProps({ name: 'checkcircle' })).toBeTruthy();
    const button = component.root.findByType(AntDesign);
    const click = await fireEvent.press(button);
    act(() => click);
    expect(component.root.findByProps({ name: 'checkcircleo' })).toBeTruthy();
  });

  it('should call remove measure if saved is true', async () => {
    const button = component.root.findByType(AntDesign);
    const click = await fireEvent.press(button);
    act(() => click);
    expect(apiService.removeSaved).toHaveBeenCalled();
  });

  it('should call add measure if saved is false', async () => {
    const promise = Promise.resolve('RIVER DIKLER AT BOURTON ON THE WATER');
    component = renderer.create(
      <Measure
        stationID={
          'http://environment.data.gov.uk/flood-monitoring/id/measures/E8266-level-stage-i-15_min-mASD'
        }
        unitName={'mASD'}
        qualifier={'Staged'}
        saved={false}
        handleClick={() => {}}
      />,
    );
    await act(() => promise);
    const button = component.root.findByType(AntDesign);
    const click = await fireEvent.press(button);
    act(() => click);
    expect(apiService.addSaved).toHaveBeenCalled();
  });
});
