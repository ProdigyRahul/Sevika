import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import {deviceHeight, deviceWidth} from '../constants/Scaling';

const Wrapper = ({children, style}) => {
  return (
    <SafeAreaView style={[styles.safeAreaView, {...style}]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaView: {
    width: deviceWidth,
    height: deviceHeight,
    alignItems: 'center',
  },
});

export default Wrapper;
