import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import apiService from '../apiservice';
import Measure from '../components/measure';
import { useFocusEffect } from '@react-navigation/native';
import { iMeasure } from '../interface';

const Saved = () => {
  const [saved, setSaved] = useState<iMeasure[]>([]);

  useEffect(() => {
    apiService.getSaved()
      .then((res) => {
        const temp = res;
        temp.forEach(measure => measure.saved = true);
        setSaved(temp);
      });
  }, []);

  useFocusEffect(() => {
    apiService.getSaved()
      .then((res) => {
        const temp = res;
        temp.forEach(measure => measure.saved = true);
        setSaved(temp);
      });  
  });

  return (
    <View style={styles.container}>
      {saved.map((measure, idx) => {
        return (
          <Measure
            key={idx}
            stationID={measure.stationID}
            qualifier={measure.qualifier}
            unitName={measure.unitName}
            saved={measure.saved}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Saved;
