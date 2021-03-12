import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from '../animations/spinner';
import apiService from '../apiservice';
import { AntDesign } from '@expo/vector-icons';

const Measure = ({ stationID, qualifier, unitName, saved }) => {
  const [waterLevel, setWaterLevel] = useState([]);
  const [measureInfo, setMeasureInfo] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedState, setSavedState] = useState(saved);

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

  const toggleSave = () => {
    if (savedState) {
      apiService.removeSaved({ stationID });
      setSavedState(false);
    } else {
      apiService.addSaved({ stationID, qualifier, unitName });
      setSavedState(true);
    }
  };

  const iconName = savedState ? 'checkcircle' : 'checkcircleo';

  useEffect(() => {
    getWaterLevel()
      .then(() => fetchMeasureInfo())
      .then((res) => setIsLoaded(true))
      .catch((err) => console.log(err));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  let render = isLoaded ? (
    <View style={styles.container}>
      <Text style={styles.text}>{waterLevel.toFixed(3)}m</Text>
      <Text style={styles.text}>{measureInfo.items.label.split('-')[0]}</Text>
      <Text style={styles.text}>{qualifier}</Text>
      <AntDesign size={30} name={iconName} color="white" onPress={toggleSave} />
    </View>
  ) : (
    <View style={styles.spinner}>
      <Spinner />
    </View>
  );

  return render;
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#154c79',
    backgroundColor: '#12486f',
    margin: 10,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
    width: '25%',
  },
  spinner: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Measure;
