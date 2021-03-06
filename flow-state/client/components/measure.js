import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Measure = ({ stationID, qualifier, unitName }) => {
  const [waterLevel, setWaterLevel] = useState([]);

  const getWaterLevel = async () => {
    if (unitName !== 'm3/s') {
      let result = await fetch(
        `http://environment.data.gov.uk/flood-monitoring/id/measures/${measureID}/readings?latest`,
      )
        .then((res) => res.json())
        .then((res) => res.items[0].value)
        .catch((err) => console.log(err));
      console.log(result);
      if (unitName === 'mASD') {
        const minDatum = await fetch(
          `http://environment.data.gov.uk/flood-monitoring/id/stations/${id}`,
        )
          .then((res) => res.json())
          .then((res) => res.items.stageScale.minOnRecord.value)
          .catch((err) => console.log(err));
        if (minDatum > result) {
          result = minDatum - result;
        } else {
          result = result - minDatum;
        }
      }
      setWaterLevel(result);
    }
  };

  useEffect(() => {
    getWaterLevel();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps
  const measureID = stationID.slice(60);
  const id = measureID.split('-')[0];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{waterLevel}</Text>
      <Text style={styles.text}>{qualifier}</Text>
      <Text style={styles.text}>{unitName}</Text>
    </View>
  );
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
