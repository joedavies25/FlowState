import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Measure from '../components/measure';
import apiService from '../apiservice';

const Flow = ({ route }) => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    apiService.getSaved(setSaved);
  }, []);

  const measures = route.params.measures;
  return (
    <View>
      {measures.map((measure, idx) => {
        for (let save in saved) {
          if (save.stationID === measure.stationID) {
            measure.saved = true;
          } else {
            measure.saved = false;
          }
        }
        return (
          <Measure
            key={idx}
            qualifier={measure.qualifier}
            stationID={measure.stationID}
            unitName={measure.unitName}
            saved={measure.saved}
          />
        );
      })}
    </View>
  );
};

export default Flow;
