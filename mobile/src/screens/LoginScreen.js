import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Wrapper from '../components/Wrapper';
import Sevika_Logo from '../assets/images/Sevika-logo.png';
import Google_Logo from '../assets/images/google-logo.png';
import Facebook_Logo from '../assets/images/facebook-logo.png';
import Apple_Logo from '../assets/images/apple-logo.png';
import {defaultColors} from '../constants/Colors';

const LoginScreen = () => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  return (
    <Wrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled">
          <View style={styles.mainContent}>
            <View style={styles.logoContainer}>
              <Image source={Sevika_Logo} style={styles.logo} />
            </View>
            <View style={styles.header}>
              <Text style={styles.headerText}>Login here</Text>
              <Text style={styles.subHeaderText}>
                We're excited to see you again!
              </Text>
            </View>
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
              <TouchableOpacity>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signInButton}>
                <Text style={styles.signInButtonText}>Sign in</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.createAccountContainer}>
              <Text style={styles.createAccountText}>
                Don't have an account?
              </Text>
              <TouchableOpacity>
                <Text style={styles.createAccountButton}>
                  Create new account
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.spacer} />
            <View style={styles.socialLoginContainer}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.orContinueWith}>or continue with</Text>
                <View style={styles.dividerLine} />
              </View>
              <View style={styles.socialIconsContainer}>
                <TouchableOpacity style={styles.socialIcon}>
                  <Image source={Google_Logo} style={styles.socialLogo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Image source={Facebook_Logo} style={styles.socialLogo} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialIcon}>
                  <Image source={Apple_Logo} style={styles.socialLogo} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  spacer: {
    flex: 1,
  },
  logoContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 120,
    right: 8,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: defaultColors.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  subHeaderText: {
    marginTop: 10,
    color: defaultColors.gray,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
  },
  inputContainer: {
    width: '85%',
    marginTop: 20,
  },
  input: {
    backgroundColor: '#F1F4FF',
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#C7D0E1',
    color: defaultColors.black,
  },
  inputFocused: {
    borderColor: defaultColors.primary,
    borderWidth: 2,
    shadowColor: defaultColors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: defaultColors.dark,
    fontWeight: '600',
    fontSize: 14,
    marginTop: -5,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: defaultColors.primary,
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: defaultColors.primary,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  createAccountContainer: {
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
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
  socialLoginContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialLogo: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
