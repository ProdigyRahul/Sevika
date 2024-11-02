import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {defaultColors} from '../constants/Colors';

const TaskScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Task Screen</Text>
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
  text: {
    fontSize: 24,
    color: defaultColors.primary,
  },
});

export default TaskScreen;