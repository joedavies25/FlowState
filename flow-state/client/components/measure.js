import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import apiService from '../apiservice';

const Measure = ({ stationID, qualifier, unitName }) => {
  const [waterLevel, setWaterLevel] = useState([]);
  const [measureInfo, setMeasureInfo] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);

  const measureID = stationID.slice(60);
  const id = measureID.split('-')[0];

  const fetchMeasureInfo = async () => {
    const result = await apiService.getMeasureInfo(stationID);
    setMeasureInfo(result);
  };

  const getWaterLevel = async () => {
    if (unitName !== 'm3/s') {
      let newWaterLevel = await apiService.getLastestReading(measureID);
      if (unitName === 'mASD') {
        const minDatum = await apiService.convertFromMASD(id);
        if (minDatum > newWaterLevel) {
          newWaterLevel = minDatum - newWaterLevel;
        } else {
          newWaterLevel = newWaterLevel - minDatum;
        }
      }
      setWaterLevel(newWaterLevel);
    }
  };

  useEffect(() => {
    getWaterLevel();
    fetchMeasureInfo()
      .then((res) => setIsLoaded(false))
      .catch((err) => console.log(err));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  let render = isLoaded ? (
    <Text>Loading</Text>
  ) : (
    <View style={styles.container}>
      <Text style={styles.text}>{waterLevel}</Text>
      <Text style={styles.text}>{qualifier}</Text>
      <Text style={styles.text}>{unitName}</Text>
      <Text style={styles.text}>{measureInfo.items.label}</Text>
    </View>
  );

  return render;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#154c79',
    margin: 10,
    borderRadius: 5,
    padding: 10,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Measure;
