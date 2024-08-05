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

const CompleteProfileScreen = () => {
  const {userData, completeProfile} = useAuth();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [userType, setUserType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (userData) {
      setPhoneNumber(userData.phoneNumber || '');
      setCity(userData.city || '');
      setUserType(userData.userType || '');
    }
  }, [userData]);

  const handleCompleteProfile = async () => {
    if (!phoneNumber || !city || !userType) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!userData || !userData.id) {
      Alert.alert('Error', 'User data is missing or invalid');
      return;
    }

    setIsLoading(true);
    try {
      await completeProfile({
        userId: userData.id,
        phoneNumber,
        city,
        userType,
      });
      setIsLoading(false);
      Alert.alert('Success', 'Profile completed successfully');
    } catch (error) {
      setIsLoading(false);
      Alert.alert(
        'Error',
        error.message || 'An error occurred while completing your profile',
      );
    }
  };
  return (
    <Wrapper style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.headerText}>Complete Your Profile</Text>
        {userData?.photoURL && (
          <Image
            source={{uri: userData.photoURL}}
            style={styles.profileImage}
          />
        )}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor={defaultColors.gray}
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <TextInput
            placeholder="City"
            placeholderTextColor={defaultColors.gray}
            style={styles.input}
            value={city}
            onChangeText={setCity}
          />
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={userType}
              onValueChange={itemValue => setUserType(itemValue)}
              style={styles.picker}>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
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
  pickerContainer: {
    backgroundColor: '#F1F4FF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#C7D0E1',
    marginBottom: 15,
    width: '100%',
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
