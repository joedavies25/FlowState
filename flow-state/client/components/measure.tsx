import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Spinner from '../animations/spinner';
import apiService from '../apiservice';
import { AntDesign } from '@expo/vector-icons';

interface MeasureProps {
  stationID: string;
  qualifier: string;
  unitName: string;
  saved: boolean;
  handleClick: Function;
}

const Measure: React.FC<MeasureProps> = ({
  stationID,
  qualifier,
  unitName,
  saved,
  handleClick,
}) => {
  const [waterLevel, setWaterLevel] = useState<number>(0);
  const [measureInfo, setMeasureInfo] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSaved, setSavedState] = useState<boolean>(saved);

  useEffect(() => {
    setSavedState(saved);
  }, [saved]);

  const measureID = stationID.slice(60);
  const id = measureID.split('-')[0];

  const fetchMeasureInfo = async () => {
    apiService.getMeasureInfo(stationID).then((res) => {
      setMeasureInfo(res);
    });
  };

  const getWaterLevel = async () => {
    let newWaterLevel: number;
    if (unitName !== 'm3/s') {
      apiService.getLastestReading(measureID).then((res) => {
        newWaterLevel = res;
        if (unitName === 'mASD') {
          let minDatum: number;
          apiService.convertFromMASD(id).then((res) => {
            minDatum = res;
            if (minDatum > newWaterLevel) {
              newWaterLevel = minDatum - newWaterLevel;
            } else {
              newWaterLevel = newWaterLevel - minDatum;
            }
          });
          setWaterLevel(newWaterLevel);
        }
      });
    }
  };

  const toggleSave = async () => {
    if (isSaved) {
      await apiService
        .removeSaved({ stationID })
        .then((res) => setSavedState(false));
      handleClick();
      // apiService.removeSaved({ stationID });
      // setSavedState(false);
    } else {
      await apiService
        .addSaved({ stationID, qualifier, unitName })
        .then((res) => setSavedState(true));
      handleClick();
    }
  };

  const iconName = isSaved ? 'checkcircle' : 'checkcircleo';

  useEffect(() => {
    getWaterLevel()
      .then(() => fetchMeasureInfo())
      .then((res) => setIsLoaded(true))
      .catch((err) => console.log(err));
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  let render = isLoaded ? (
    <View style={styles.container}>
      <Text style={styles.text}>{waterLevel.toFixed(3)}m</Text>
      <Text style={styles.text}>{measureInfo}</Text>
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
