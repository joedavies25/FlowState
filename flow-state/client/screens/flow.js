import React from 'react';
import { View } from 'react-native';
import Measure from '../components/measure';

const Flow = ({ route }) => {
  const measures = route.params.measures;
  return (
    <View>
      {measures.map((measure, idx) => {
        return (
          <Measure
            key={idx}
            qualifier={measure.qualifier}
            stationID={measure.stationID}
            unitName={measure.unitName}
          />
        );
      })}
    </View>
  );
};

export default Flow;
