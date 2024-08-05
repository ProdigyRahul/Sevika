import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/cirlceanimation.json')}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8FF',
  },
});

export default SplashScreen;
