import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Wrapper from '../components/Wrapper';
import {defaultColors} from '../constants/Colors';
import {deviceWidth} from '../constants/Scaling';
import {useAuth} from '../hooks/useAuth';
import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
const IndianFlag = require('../assets/images/indian-flag.jpg');

const CompleteProfileScreen = () => {
  const navigation = useNavigation();
  const {userData, completeProfile} = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [userType, setUserType] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setPhoneNumber(userData.phoneNumber || '');
      setCity(userData.city || '');
      setUserType(userData.userType || '');
    }
  }, [userData]);

  const pickImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setProfileImage(response.assets[0]);
      }
    });
  };

  const handleCompleteProfile = async () => {
    if (!firstName || !lastName || !phoneNumber || !city || !userType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!userData || !userData.id) {
      Alert.alert('Error', 'User data is missing or invalid');
      return;
    }

    setIsLoading(true);
    try {
      const profileData = {
        userId: userData.id,
        firstName,
        lastName,
        phoneNumber,
        city,
        userType,
      };

      if (profileImage && !userData.googleId) {
        profileData.profileImage = {
          uri: profileImage.uri,
          type: profileImage.type,
          name: profileImage.fileName || 'profile.jpg',
        };
      }

      console.log('Sending profile data:', profileData);
      const result = await completeProfile(profileData);
      if (result.success) {
        Alert.alert('Success', 'Profile completed successfully', [
          {text: 'OK', onPress: () => navigation.replace('Home')},
        ]);
      } else {
        Alert.alert(
          'Error',
          result.message || 'An error occurred while completing your profile',
        );
      }
    } catch (error) {
      console.error('Complete profile error:', error);
      Alert.alert(
        'Error',
        error.message || 'An error occurred while completing your profile',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = inputName => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const isGoogleUser = userData && userData.googleId;

  return (
    <Wrapper style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Complete Your Profile</Text>
        <TouchableOpacity
          onPress={pickImage}
          style={styles.imagePickerContainer}>
          {profileImage ? (
            <Image
              source={{uri: profileImage.uri}}
              style={styles.profileImage}
            />
          ) : userData?.photoURL ? (
            <Image
              source={{uri: userData.photoURL}}
              style={styles.profileImage}
            />
          ) : (
            <Text style={styles.imagePickerText}>Pick a profile image</Text>
          )}
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor={defaultColors.gray}
            style={[
              styles.input,
              focusedInput === 'firstName' && styles.inputFocused,
            ]}
            value={firstName}
            onChangeText={setFirstName}
            editable={!isGoogleUser}
            onFocus={() => handleInputFocus('firstName')}
            onBlur={handleInputBlur}
          />
          <TextInput
            placeholder="Last Name"
            placeholderTextColor={defaultColors.gray}
            style={[
              styles.input,
              focusedInput === 'lastName' && styles.inputFocused,
            ]}
            value={lastName}
            onChangeText={setLastName}
            editable={!isGoogleUser}
            onFocus={() => handleInputFocus('lastName')}
            onBlur={handleInputBlur}
          />
          <View
            style={[
              styles.phoneInputContainer,
              focusedInput === 'phoneNumber' && styles.inputFocused,
            ]}>
            <Image source={IndianFlag} style={styles.flagIcon} />
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={defaultColors.gray}
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              onFocus={() => handleInputFocus('phoneNumber')}
              onBlur={handleInputBlur}
            />
          </View>
          <TextInput
            placeholder="City"
            placeholderTextColor={defaultColors.gray}
            style={[
              styles.input,
              focusedInput === 'city' && styles.inputFocused,
            ]}
            value={city}
            onChangeText={setCity}
            onFocus={() => handleInputFocus('city')}
            onBlur={handleInputBlur}
          />
          <View
            style={[
              styles.pickerContainer,
              focusedInput === 'userType' && styles.inputFocused,
            ]}>
            <Picker
              selectedValue={userType}
              onValueChange={itemValue => setUserType(itemValue)}
              style={styles.picker}
              onFocus={() => handleInputFocus('userType')}
              onBlur={handleInputBlur}>
              <Picker.Item label="Select User Type" value="" />
              <Picker.Item label="Volunteer" value="Volunteer" />
              <Picker.Item label="NGO" value="NGO" />
              <Picker.Item label="Company" value="Company" />
            </Picker>
          </View>
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleCompleteProfile}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.completeButtonText}>Complete Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: defaultColors.veryLight,
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
  },
  headerText: {
    color: defaultColors.primary,
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 20,
  },
  imagePickerContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F1F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePickerText: {
    color: defaultColors.gray,
    textAlign: 'center',
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
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F4FF',
    height: 58,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C7D0E1',
    width: '100%',
  },
  flagIcon: {
    width: 24,
    height: 16,
    marginLeft: 12,
    marginRight: 8,
  },
  countryCode: {
    fontSize: 16,
    color: defaultColors.black,
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: defaultColors.black,
    padding: 12,
  },
  pickerContainer: {
    backgroundColor: '#F1F4FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C7D0E1',
    marginBottom: 15,
    width: '100%',
    overflow: 'hidden',
  },
  picker: {
    height: 58,
    width: '100%',
  },
  completeButton: {
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
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default CompleteProfileScreen;
