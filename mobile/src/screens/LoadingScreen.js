import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import {defaultColors} from '../constants/Colors';
import {FONT_SIZE, SPACING} from '../utils/constants';

const LoadingScreen = ({onLoadingComplete}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete();
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Sevika-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../assets/animations/loading-animation.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
      <Text style={styles.tagline}>Sahyog Seva Samarpan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: defaultColors.veryLight,
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: SPACING.large,
  },
  loadingContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: '100%',
    height: '100%',
  },
  tagline: {
    marginTop: SPACING.large,
    fontSize: FONT_SIZE.large,
    color: defaultColors.primary,
    fontStyle: 'italic',
    fontWeight: '600',
  },
});

export default LoadingScreen;
