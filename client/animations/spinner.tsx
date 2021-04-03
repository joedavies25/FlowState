import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

import spinnerFile from '../assets/spinner.json';

const Spinner: React.FC = () => {
  const loaderAnimation = useRef();

  useEffect(() => {
    loaderAnimation.current.play();
  }, []);

  return (
    <View>
      <LottieView
        style={styles.spinner}
        ref={loaderAnimation}
        autoPlay={true}
        loop={true}
        source={spinnerFile}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  spinner: {
    height: 40,
    width: 40,
  },
});

export default Spinner;
