import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Measure from '../components/measure';
import apiService from '../apiservice';
import { iMeasure } from '../interface';
import { FlatList } from 'react-native-gesture-handler';

interface NavigationProps {
  route: any
}

const Flow: React.FC<NavigationProps> = ({ route }) => {
  const [saved, setSaved] = useState<iMeasure[]>([]);
  // const [likedMeasures, setLikedMeasures] = useState<SavedMeasure[]>([]);
  const measures: iMeasure[] = route.params.measures;

  useEffect(() => {
    apiService.getSaved()
      .then((res) => {
        res.map((measure: iMeasure) => {
          measures.forEach(el => {
            if (el.stationID === measure.stationID) {
              el.saved = true;
            } else {
              el.saved = false;
            };

          })
        });
        setSaved(measures);
      });
  }, []);

  return (
    <View>
      {
        saved.length > 0
        ? 
        <FlatList 
        data={saved}
        renderItem={data => (
          <Measure
            key={data.index}
            qualifier={data.item.qualifier}
            stationID={data.item.stationID}
            unitName={data.item.unitName}
            saved={data.item.saved} //TODO: call Andrew!
          />
        )}
      />
      : <View></View>
      }
    </View>
  );
};

export default Flow;
