import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import mapStyle from '../mapStyle';
import apiService from '../apiservice';
import SplashScreen from '../animations/waterLoader';
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';

const Map = ({ navigation }) => {
  const [stations, setStations] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    apiService.getStations(setStations);
    setTimeout(() => {
      setIsLoaded(true);
    }, 6000);
  }, []);

  return isLoaded ? (
    <View style={styles.container}>
      <StatusBar hidden />
      <MapView
        style={styles.map}
        provider="google"
        customMapStyle={mapStyle}
        clusterColor="#12486f"
        initialRegion={{
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
              onPress={() => {
                navigation.navigate('Flow', {
                  measures: station.measures,
                });
              }}
            />
          );
        })}
      </MapView>
    </View>
  ) : (
    <SplashScreen />
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
