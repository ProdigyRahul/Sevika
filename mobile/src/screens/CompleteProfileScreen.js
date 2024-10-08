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
  Modal,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import Wrapper from '../components/Wrapper';
import {defaultColors} from '../constants/Colors';
import {deviceWidth} from '../constants/Scaling';
import {useAuth} from '../hooks/useAuth';
import indianCities from '../assets/data/Cities.json';

const IndianFlag = require('../assets/images/indian-flag.jpg');
const CompanyIcon = require('../assets/images/office-building.png');
const NGOIcon = require('../assets/images/ngo.png');
const VolunteerIcon = require('../assets/images/help.png');

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
  const [showCityModal, setShowCityModal] = useState(false);
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const [citySearch, setCitySearch] = useState('');
  const [filteredCities, setFilteredCities] = useState(indianCities);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setPhoneNumber(userData.phoneNumber || '');
      setCity(userData.city || '');
      setUserType(userData.userType || '');
    }
  }, [userData]);

  useEffect(() => {
    const filtered = indianCities.filter(
      city =>
        city.name.toLowerCase().includes(citySearch.toLowerCase()) ||
        city.state.toLowerCase().includes(citySearch.toLowerCase()),
    );
    setFilteredCities(filtered);
  }, [citySearch]);

  const userTypeOptions = [
    {label: 'Volunteer', value: 'Volunteer', icon: VolunteerIcon},
    {label: 'NGO', value: 'NGO', icon: NGOIcon},
    {label: 'Company', value: 'Company', icon: CompanyIcon},
  ];

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

  const handleCitySelect = selectedCity => {
    setCity(selectedCity);
    setCitySearch('');
    setShowCityModal(false);
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
          {text: 'OK', onPress: () => console.log('Successfully Signup')},
          ,
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

  const renderCityItem = ({item}) => (
    <TouchableOpacity
      style={styles.cityItem}
      onPress={() => handleCitySelect(item.name)}>
      <Text style={styles.cityName}>{item.name}</Text>
      <Text style={styles.stateName}>{item.state}</Text>
    </TouchableOpacity>
  );

  const renderCityList = () => {
    if (filteredCities.length === 0) {
      return (
        <View style={styles.noCityFoundContainer}>
          <Text style={styles.noCityFoundText}>No cities found</Text>
          <Text style={styles.noCityFoundSubtext}>
            Try a different search term or check the spelling
          </Text>
        </View>
      );
    }

    return (
      <FlatList
        data={filteredCities}
        renderItem={renderCityItem}
        keyExtractor={item => item.id}
        style={styles.cityList}
        keyboardShouldPersistTaps="always"
      />
    );
  };

  const renderUserTypeItem = ({item}) => (
    <TouchableOpacity
      style={[
        styles.userTypeItem,
        userType === item.value && styles.userTypeItemSelected,
      ]}
      onPress={() => {
        setUserType(item.value);
        setShowUserTypeModal(false);
      }}>
      <View style={styles.userTypeIconContainer}>
        <Image source={item.icon} style={styles.userTypeIcon} />
      </View>
      <Text
        style={[
          styles.userTypeName,
          userType === item.value && styles.userTypeNameSelected,
        ]}>
        {item.label}
      </Text>
    </TouchableOpacity>
  );

  const closeModal = modalSetter => {
    modalSetter(false);
  };

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
          <TouchableOpacity
            style={[
              styles.input,
              focusedInput === 'city' && styles.inputFocused,
            ]}
            onPress={() => setShowCityModal(true)}>
            <Text style={city ? styles.inputText : styles.placeholderText}>
              {city || 'Select City'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.input,
              focusedInput === 'userType' && styles.inputFocused,
            ]}
            onPress={() => setShowUserTypeModal(true)}>
            <Text style={userType ? styles.inputText : styles.placeholderText}>
              {userType || 'Select User Type'}
            </Text>
          </TouchableOpacity>
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

      <Modal
        visible={showCityModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => closeModal(setShowCityModal)}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search for a city"
                value={citySearch}
                onChangeText={setCitySearch}
              />
              {renderCityList()}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => closeModal(setShowCityModal)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <Modal
        visible={showUserTypeModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => closeModal(setShowUserTypeModal)}>
        <TouchableWithoutFeedback
          onPress={() => closeModal(setShowUserTypeModal)}>
          <View style={styles.userTypeModalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.userTypeModalContent}>
                <Text style={styles.userTypeModalTitle}>Select User Type</Text>
                <FlatList
                  data={userTypeOptions}
                  renderItem={renderUserTypeItem}
                  keyExtractor={item => item.value}
                  contentContainerStyle={styles.userTypeList}
                  numColumns={2}
                />
                <TouchableOpacity
                  style={styles.userTypeCloseButton}
                  onPress={() => closeModal(setShowUserTypeModal)}>
                  <Text style={styles.userTypeCloseButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#C7D0E1',
    color: defaultColors.black,
    width: '100%',
    justifyContent: 'center',
  },
  inputText: {
    color: defaultColors.black,
    fontSize: 16,
  },
  placeholderText: {
    color: defaultColors.gray,
    fontSize: 16,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  searchInput: {
    height: 40,
    borderColor: '#C7D0E1',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  cityList: {
    maxHeight: '80%',
  },
  cityItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  cityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: defaultColors.black,
  },
  stateName: {
    fontSize: 14,
    color: defaultColors.gray,
  },
  closeButton: {
    backgroundColor: defaultColors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  userTypeModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  userTypeModalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
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
  userTypeModalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: defaultColors.primary,
    marginBottom: 20,
  },
  userTypeList: {
    flexGrow: 0,
  },
  userTypeItem: {
    width: '45%',
    aspectRatio: 1,
    margin: '2.5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F4FF',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userTypeItemSelected: {
    backgroundColor: defaultColors.primary,
  },
  userTypeNameSelected: {
    color: 'white',
  },
  userTypeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userTypeIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  noCityFoundText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: defaultColors.gray,
    marginTop: 10,
    textAlign: 'center',
  },
  noCityFoundSubtext: {
    fontSize: 14,
    color: defaultColors.gray,
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  userTypeName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: defaultColors.black,
  },
  userTypeCloseButton: {
    marginTop: 20,
    backgroundColor: defaultColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  userTypeCloseButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CompleteProfileScreen;
