import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import apiService from '../apiservice';
import Measure from '../components/measure';
import { useFocusEffect } from '@react-navigation/native';
import { iMeasure } from '../interface';

interface SavedProps {
  navigation: any;
}

const Saved: React.FC<SavedProps> = ({ navigation }) => {
  const [saved, setSaved] = useState<iMeasure[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      apiService.getSaved().then((res) => {
        const temp = res;
        temp.forEach((measure) => (measure.saved = true));
        setSaved(temp);
      });
    });
    return unsubscribe;
  }, []);

  function handleClick(): void {
    apiService.getSaved().then((res) => {
      const temp = res;
      temp.forEach((measure) => (measure.saved = true));
      setSaved(temp);
    });
  }

  // useFocusEffect(() => {
  //   apiService.getSaved()
  //     .then((res) => {
  //       const temp = res;
  //       temp.forEach(measure => measure.saved = true);
  //       setSaved(temp);
  //     });
  // });

  return (
    <View style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(item: iMeasure) => item._id}
        renderItem={(data) => (
          <Measure
            stationID={data.item.stationID}
            qualifier={data.item.qualifier}
            unitName={data.item.unitName}
            saved={data.item.saved}
            handleClick={handleClick}
          />
        )}
      />
      {/* {saved.map((measure, idx) => {
        return (
          <Measure
            key={idx}
            stationID={measure.stationID}
            qualifier={measure.qualifier}
            unitName={measure.unitName}
            saved={measure.saved}
          />
        );
      })} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Saved;
