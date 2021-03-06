import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import mapStyle from '../mapStyle';
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';

const Map = ({ navigation }) => {
  const [stations, setStations] = useState([]);

  const fetchStations = async () => {
    const res = await fetch('http://192.168.1.82:3001/stations');
    const result = await res.json();
    setStations(result);
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <MapView
        style={styles.map}
        provider="google"
        customMapStyle={mapStyle}
        region={{
          latitude: 53.483959,
          longitude: -2.244644,
          latitudeDelta: 2.7027027027,
          longitudeDelta: 5.40540540541,
        }}
        minZoomLevel={6}
        maxZoomLevel={15}
      >
        {stations.map((station, idx) => {
          return (
            <Marker
              key={idx}
              pinColor="#1e81b0"
              coordinate={{
                latitude: station.latitude,
                longitude: station.longitude,
              }}
              title={station.title}
              onPress={() => {
                navigation.navigate('Flow', { measures: station.measures });
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;
