import React, {useState} from 'react';
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
} from 'react-native';
import Wrapper from '../components/Wrapper';
import Sevika_Logo from '../assets/images/Sevika-logo.png';
import Google_Logo from '../assets/images/google-logo.png';
import Facebook_Logo from '../assets/images/facebook-logo.png';
import Apple_Logo from '../assets/images/apple-logo.png';
import {defaultColors} from '../constants/Colors';
import {deviceWidth} from '../constants/Scaling';

const LoginScreen = ({navigation}) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={defaultColors.gray}
              style={[styles.input, isPasswordFocused && styles.inputFocused]}
              secureTextEntry
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />
            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password ?</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signInButton}>
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
            {[Google_Logo, Facebook_Logo, Apple_Logo].map((logo, index) => (
              <TouchableOpacity key={index} style={styles.socialIcon}>
                <Image source={logo} style={styles.socialLogo} />
              </TouchableOpacity>
            ))}
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
});

export default LoginScreen;
