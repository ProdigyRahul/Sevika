import React, {createContext, useState, useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  storeUserData,
  getUserData,
  removeUserData,
} from '../utils/asyncStorage';
import * as authApi from '../api/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkUserData();
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = async () => {
    await GoogleSignin.configure({
      webClientId:
        '443401979985-jumir08cfrt97p2370p2f6qat6qifhu7.apps.googleusercontent.com',
    });
  };

  const checkUserData = async () => {
    const storedUserData = await getUserData();
    setUserData(storedUserData);
    setIsLoading(false);
  };

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      if (response && response.user) {
        const userDataToStore = {
          token: response.token,
          id: response.user.id,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
          userType: response.user.userType,
        };
        setUserData(userDataToStore);
        await storeUserData(userDataToStore);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      throw error.message || 'An error occurred during login';
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const response = await authApi.googleSignIn(userInfo);
      if (response && response.user) {
        const userDataToStore = {
          token: response.token,
          id: response.user.id,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          email: response.user.email,
          userType: response.user.userType,
          photoURL: response.user.photoURL,
        };
        setUserData(userDataToStore);
        await storeUserData(userDataToStore);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      throw error.message || 'An error occurred during Google Sign-In';
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      await GoogleSignin.signOut();
      setUserData(null);
      await removeUserData();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{isLoading, userData, login, googleSignIn, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
