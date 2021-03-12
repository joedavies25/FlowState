import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import waterLoader from '../assets/water-loader.json';

const LoadingScreen = () => {
  const waterLoaderAnimation = useRef(null);

  return (
    <View style={styles.container}>
      <LottieView
        ref={waterLoaderAnimation}
        style={{ height: 400, width: 400 }}
        autoPlay={true}
        source={waterLoader}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
