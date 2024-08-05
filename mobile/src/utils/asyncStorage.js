import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_DATA_KEY = 'userData';

export const storeUserData = async userData => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

export const getUserData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error('Error removing user data:', error);
  }
};

export const updateUserData = async newData => {
  try {
    const currentData = await getUserData();
    const updatedData = {...currentData, ...newData};
    await storeUserData(updatedData);
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};
