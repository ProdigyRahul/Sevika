import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Wrapper from '../components/Wrapper';
import {defaultColors} from '../constants/Colors';

const ApprovalPendingScreen = () => {
  return (
    <Wrapper style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Please Wait</Text>

        <Text style={styles.descriptionText}>
          We are currently verifying your account
        </Text>

        <Text style={styles.subtitleText}>
          This process may take a few moments. Please do not close the app.
        </Text>

        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Application Received</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, styles.pendingDot]} />
            <Text style={styles.statusText}>Under Review</Text>
          </View>
          <View style={styles.statusItem}>
            <View style={[styles.statusDot, styles.inactiveDot]} />
            <Text style={styles.statusText}>Approval Decision</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: defaultColors.veryLight,
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  headerText: {
    color: defaultColors.primary,
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 15,
    textAlign: 'center',
  },
  descriptionText: {
    color: defaultColors.black,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitleText: {
    color: defaultColors.gray,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  statusContainer: {
    width: '100%',
    backgroundColor: '#F1F4FF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statusDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 10,
    backgroundColor: 'green',
  },
  pendingDot: {
    backgroundColor: defaultColors.primary,
  },
  inactiveDot: {
    backgroundColor: defaultColors.gray,
  },
  statusText: {
    fontSize: 16,
    color: defaultColors.black,
  },
  contactButton: {
    backgroundColor: defaultColors.primary,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
    shadowColor: defaultColors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  contactButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default ApprovalPendingScreen;
