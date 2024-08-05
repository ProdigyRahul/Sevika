import React, {useEffect, useState} from 'react';
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

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const {login, googleSignIn} = useAuth();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '443401979985-jumir08cfrt97p2370p2f6qat6qifhu7.apps.googleusercontent.com',
    });
  }, []);

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

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

    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log('Google Sign-In Error:', error);
      // Alert.alert('Google Sign-In Failed', error.message);
    }
  };
  return (
    <Wrapper style={styles.wrapper}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <Image source={Sevika_Logo} style={styles.logo} />
          <Text style={styles.headerText}>Login here</Text>
          <Text style={styles.subHeaderText}>
            We're excited to see you again!
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              placeholderTextColor={defaultColors.gray}
              style={[styles.input, isEmailFocused && styles.inputFocused]}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
            <TextInput
              placeholder="Password"
              placeholderTextColor={defaultColors.gray}
              style={[styles.input, isPasswordFocused && styles.inputFocused]}
              secureTextEntry
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              value={password}
              onChangeText={setPassword}
            />
            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
              <Text style={styles.signInButtonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.createAccountContainer}>
            <Text style={styles.createAccountText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.createAccountButton}>Create new account</Text>
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
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
    marginRight: 10,
  },
  forgotPassword: {
    color: defaultColors.dark,
    fontWeight: '600',
    fontSize: 14,
  },
  signInButton: {
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
    width: '100%',
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 30,
  },
  createAccountText: {
    color: defaultColors.gray,
    fontSize: 16,
  },
  createAccountButton: {
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

export default LoginScreen;
