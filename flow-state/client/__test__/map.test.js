import React from 'react';
import renderer from 'react-test-renderer';
import fetchMock from 'jest-fetch-mock';
import Map from '../screens/map';

describe.skip('<Map />', () => {
  it('has 1 child', () => {
    const tree = renderer.create(<Map />).toJSON();
    expect(tree.children.length).toBe(2);
  });