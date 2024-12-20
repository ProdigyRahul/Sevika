import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Wrapper from '../components/Wrapper';
import Sevika_Logo from '../assets/images/Sevika-logo.png';
import Google_Logo from '../assets/images/google-logo.png';
import Facebook_Logo from '../assets/images/facebook-logo.png';
import Apple_Logo from '../assets/images/apple-logo.png';
import {defaultColors} from '../constants/Colors';
import {deviceWidth} from '../constants/Scaling';
import {useAuth} from '../hooks/useAuth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const {signup, googleSignIn} = useAuth();

  const scrollViewRef = useRef(null);
  const signUpButtonRef = useRef(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '443401979985-jumir08cfrt97p2370p2f6qat6qifhu7.apps.googleusercontent.com',
    });
  }, []);

  const handleInputFocus = inputName => {
    if (inputName === 'email') setIsEmailFocused(true);
    if (inputName === 'password') setIsPasswordFocused(true);
    if (inputName === 'confirmPassword') setIsConfirmPasswordFocused(true);

    setTimeout(() => {
      signUpButtonRef.current?.measureLayout(scrollViewRef.current, (x, y) => {
        scrollViewRef.current?.scrollTo({y: (y - 20) / 4, animated: true});
      });
    }, 100);
  };

  const handleInputBlur = inputName => {
    if (inputName === 'email') setIsEmailFocused(false);
    if (inputName === 'password') setIsPasswordFocused(false);
    if (inputName === 'confirmPassword') setIsConfirmPasswordFocused(false);
  };

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignup = async () => {
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      const result = await signup(email, password);
      setIsLoading(false);
      if (result.success) {
        Alert.alert('Success', result.message, [
          {
            text: 'OK',
            onPress: () =>
              navigation.navigate('VerifyOTP', {
                email: result.email,
                userId: result.userId,
              }),
          },
        ]);
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log('Google Sign-In Error:', error);
      Alert.alert('Google Sign-In Failed', error.message);
    }
  };

  return (
    <Wrapper style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Image source={Sevika_Logo} style={styles.logo} />
          <Text style={styles.headerText}>Create Account</Text>
          <Text style={styles.subHeaderText}>
            Join us and start your journey today!
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={defaultColors.gray}
              style={[styles.input, isEmailFocused && styles.inputFocused]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={() => handleInputFocus('email')}
              onBlur={() => handleInputBlur('email')}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
            <TextInput
              placeholder="Password"
              placeholderTextColor={defaultColors.gray}
              style={[styles.input, isPasswordFocused && styles.inputFocused]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              onFocus={() => handleInputFocus('password')}
              onBlur={() => handleInputBlur('password')}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor={defaultColors.gray}
              style={[
                styles.input,
                isConfirmPasswordFocused && styles.inputFocused,
              ]}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              onFocus={() => handleInputFocus('confirmPassword')}
              onBlur={() => handleInputBlur('confirmPassword')}
            />
            {confirmPasswordError ? (
              <Text style={styles.errorText}>{confirmPasswordError}</Text>
            ) : null}
            <TouchableOpacity
              ref={signUpButtonRef}
              style={styles.signUpButton}
              onPress={handleSignup}
              disabled={isLoading}>
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.signUpButtonText}>Sign up</Text>
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginButton}>Log in</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.orContinueWith}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>
          <View style={styles.socialIconsContainer}>
            <TouchableOpacity
              style={styles.socialIcon}
              onPress={handleGoogleSignIn}>
              <Image source={Google_Logo} style={styles.socialLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Image source={Facebook_Logo} style={styles.socialLogo} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Image source={Apple_Logo} style={styles.socialLogo} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: defaultColors.veryLight,
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: defaultColors.veryLight,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: 150,
    height: 120,
    marginBottom: 20,
  },
  headerText: {
    color: defaultColors.primary,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },
  subHeaderText: {
    color: defaultColors.gray,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    width: deviceWidth - 60,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#F1F4FF',
    height: 58,
    marginBottom: 15,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#C7D0E1',
    color: defaultColors.black,
    width: '100%',
  },
  inputFocused: {
    borderColor: defaultColors.primary,
    borderWidth: 2,
    shadowColor: defaultColors.primary,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  signUpButton: {
    backgroundColor: defaultColors.primary,
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: defaultColors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginTop: 10,
    width: '100%',
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
  loginText: {
    color: defaultColors.gray,
    fontSize: 16,
  },
  loginButton: {
    color: defaultColors.primary,
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 5,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth - 60,
    marginBottom: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: defaultColors.gray,
  },
  orContinueWith: {
    color: defaultColors.gray,
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialIcon: {
    backgroundColor: '#9acccd',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  socialLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  errorText: {
    color: defaultColors.red,
    fontSize: 14,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

export default SignupScreen;
