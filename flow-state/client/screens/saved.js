import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import apiService from '../apiservice';
import Measure from '../components/measure';
import { useFocusEffect } from '@react-navigation/native';

const Saved = () => {
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    apiService.getSaved(setSaved);
  }, []);

  useFocusEffect(() => {
    apiService.getSaved(setSaved);
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
            saved={saved}
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
