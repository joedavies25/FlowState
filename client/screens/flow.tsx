import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import Measure from '../components/measure';
import apiService from '../apiservice';
import { iMeasure } from '../interface';
import { createIconSetFromFontello } from '@expo/vector-icons';

interface NavigationProps {
  route: any;
  navigation: any;
}

const Flow: React.FC<NavigationProps> = ({ route, navigation }) => {
  const [saved, setSaved] = useState<iMeasure[]>([]);
  // const [likedMeasures, setLikedMeasures] = useState<SavedMeasure[]>([]);
  const measures: iMeasure[] = route.params.measures;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      apiService.getSaved().then((res) => {
        if (res.length === 0) {
          const newMeasurments = measures.map((el) => {
            return { ...el, saved: false };
          });
          setSaved(newMeasurments);
        } else {
          const newMeasurments = measures.map((measure: iMeasure) => {
            if (res.some((el) => el.stationID === measure.stationID)) {
              return { ...measure, saved: true };
            } else {
              return { ...measure, saved: false };
            }
          });
          setSaved(newMeasurments);
        }
      });
    });
    return unsubscribe;
  }, [navigation]);

  function handleClick(): void {
    apiService.getSaved().then((res) => {
      if (res.length === 0) {
        const newMeasurments = measures.map((el) => {
          return { ...el, saved: false };
        });
        setSaved(newMeasurments);
      } else {
        const nemMeasurments = measures.map((measure: iMeasure) => {
          if (res.some((el) => el.stationID === measure.stationID)) {
            return { ...measure, saved: true };
          } else {
            return { ...measure, saved: false };
          }
        });
        setSaved(nemMeasurments);
      }
    });
  }

  return (
    <View>
      {saved.length > 0 && (
        <FlatList
          data={saved}
          renderItem={(data) => (
            <Measure
              key={data.item._id}
              qualifier={data.item.qualifier}
              stationID={data.item.stationID}
              unitName={data.item.unitName}
              saved={data.item.saved} //TODO: call Andrew!
              handleClick={handleClick}
            />
          )}
        />
      )}
    </View>
  );
};

export default Flow;
