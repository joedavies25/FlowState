import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-map-clustering';
import {
  View,
  StatusBar,
  StyleSheet,
  Dimensions,
} from 'react-native';
import mapStyle from '../mapStyle';
import apiService from '../apiservice';
import SplashScreen from '../animations/waterLoader';
import { iStation } from '../interface';

interface NavigationProps {
  navigation: any
}

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

const Map: React.FC<NavigationProps> = ({ navigation }) => {
  const [stations, setStations] = useState<iStation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    apiService.getStations()
      .then((res) => {
        setStations(res);
        setIsLoaded(true);
      });
  //   setTimeout(() => {
  //     setIsLoaded(true);
  //   }, 6000);
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
        {stations.map((station) => (
          <Marker
            key={station._id}
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
        ))}
      </MapView>
    </View>
  ) : (
    <SplashScreen />
  );
};

export default Map;
