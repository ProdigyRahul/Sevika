import React, {useState, useRef, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import {useAuth} from '../hooks/useAuth';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {defaultColors} from '../constants/Colors';

const VerifyOTPScreen = ({route, navigation}) => {
  const {email, userId} = route.params;
  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const inputRefs = useRef([]);
  const {verifyOTP, resendOTP} = useAuth();

  const progress = useSharedValue(0);

  useEffect(() => {
    let interval;
    if (resendDisabled && cooldownTimer > 0) {
      interval = setInterval(() => {
        setCooldownTimer(prevTimer => prevTimer - 1);
        progress.value = withTiming((60 - cooldownTimer) / 60, {
          duration: 1000,
          easing: Easing.linear,
        });
      }, 1000);
    } else if (cooldownTimer === 0) {
      setResendDisabled(false);
      progress.value = withTiming(0);
    }
    return () => clearInterval(interval);
  }, [resendDisabled, cooldownTimer]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const focusInput = index => {
    if (index >= 0 && index < 6) {
      inputRefs.current[index].focus();
    }
  };

  const handleTextInputChange = (text, index) => {
    const newOTP = [...otp];
    newOTP[index] = text;
    setOTP(newOTP);

    if (text.length === 1 && index < 5) {
      focusInput(index + 1);
    }
  };

  const handleKeyPress = (event, index) => {
    if (event.nativeEvent.key === 'Backspace') {
      if (otp[index] === '') {
        // If current input is empty, move to previous input
        if (index > 0) {
          const newOTP = [...otp];
          newOTP[index - 1] = '';
          setOTP(newOTP);
          focusInput(index - 1);
        }
      } else {
        // If current input has a value, clear it
        const newOTP = [...otp];
        newOTP[index] = '';
        setOTP(newOTP);
      }
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      await verifyOTP(userId, otpString);
      Alert.alert('Success', 'Email verified successfully', [
        {text: 'OK', onPress: () => navigation.replace('CompleteProfile')},
      ]);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setResendDisabled(true);
      setCooldownTimer(60);
      progress.value = 0;
      await resendOTP(email);
      Alert.alert('Success', 'OTP resent successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Image
            source={require('../assets/images/Sevika-logo.png')}
            style={styles.logo}
          />
          <Text style={styles.welcomeText}>Verify Your Email</Text>
          <Text style={styles.instruction}>
            Please enter the 6-digit OTP sent to your email to verify your
            account.
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={[
                  styles.otpInput,
                  digit && styles.otpInputFilled,
                  inputRefs.current[index]?.isFocused() &&
                    styles.otpInputFocused,
                ]}
                keyboardType="numeric"
                maxLength={1}
                value={digit}
                onChangeText={text => handleTextInputChange(text, index)}
                onKeyPress={event => handleKeyPress(event, index)}
                onSubmitEditing={() => {
                  if (index === 5) {
                    handleVerifyOTP();
                  } else {
                    focusInput(index + 1);
                  }
                }}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={handleVerifyOTP}
            style={styles.verifyButton}
            disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.verifyButtonText}>Verify OTP</Text>
            )}
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the OTP?</Text>
            <TouchableOpacity
              onPress={handleResendOTP}
              disabled={resendDisabled}>
              <Text
                style={[
                  styles.resendButtonText,
                  resendDisabled && styles.resendButtonTextDisabled,
                ]}>
                {resendDisabled ? `Resend in ${cooldownTimer}s` : 'Resend OTP'}
              </Text>
            </TouchableOpacity>
          </View>

          {resendDisabled && (
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, animatedStyle]} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    height: 80,
    width: 150,
    right: 10,
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666666',
    maxWidth: 300,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    width: '100%',
    maxWidth: 300,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    width: 45,
    height: 55,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    borderRadius: 8,
    color: '#333333',
    backgroundColor: '#FFFFFF',
  },
  otpInputFilled: {
    borderColor: defaultColors.primary,
  },
  otpInputFocused: {
    borderColor: defaultColors.primary,
    backgroundColor: '#FFFFFF',
    shadowColor: defaultColors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
    transform: [{scale: 1.05}],
  },
  verifyButton: {
    backgroundColor: defaultColors.primary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
  resendText: {
    color: '#666666',
    fontSize: 14,
    marginBottom: 5,
  },
  resendButtonText: {
    color: defaultColors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButtonTextDisabled: {
    opacity: 0.6,
  },
  progressBarContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: defaultColors.primary,
  },
});

export default VerifyOTPScreen;
