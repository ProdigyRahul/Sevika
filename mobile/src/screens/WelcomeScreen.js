import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import Sevika_Logo from '../assets/images/Sevika-logo.png';
import volunteerAnimation from '../assets/animations/help-animation.json';

const {width, height} = Dimensions.get('window');

const colors = {
  primary: '#008080',
  lightPrimary: '#9ACCCD',
  veryLight: '#F8F8FF',
  dark: '#151618',
  darkGray: '#6B7380',
  green: '#30CA52',
};

const WelcomeScreen = ({navigation}) => {
  const insets = useSafeAreaInsets();

  const renderButton = (text, onPress, color) => (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.contentContainer}>
        <Image source={Sevika_Logo} style={styles.logo} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Welcome to Sevika</Text>
          <Text style={styles.subtitle}>Sahyog Seva Samarpan</Text>
          <Text style={styles.description}>
            Empowering individuals to volunteer and connect with NGOs. Make a
            difference in your community.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {renderButton(
            'Login',
            () => navigation.navigate('Login'),
            colors.primary,
          )}
          {renderButton(
            'Sign Up',
            () => navigation.navigate('Signup'),
            colors.green,
          )}
        </View>
      </View>
      <View style={styles.animationContainer}>
        <LottieView
          source={volunteerAnimation}
          autoPlay
          loop
          style={styles.lottieAnimation}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.veryLight,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.5,
    marginBottom: 20,
    tintColor: colors.primary,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.dark,
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: colors.darkGray,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    width: '48%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: colors.veryLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  animationContainer: {
    position: 'absolute',
    top: -height * 0.23,
    right: -width * 0.3,
    width: width * 0.7,
    height: height * 0.7,
    zIndex: 1,
  },
  lottieAnimation: {
    width: '100%',
    height: '100%',
  },
});

export default WelcomeScreen;
