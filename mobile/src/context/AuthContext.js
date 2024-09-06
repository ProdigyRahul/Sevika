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

  const checkUserData = async () => {
    const storedUserData = await getUserData();
    setUserData(storedUserData);
    setIsLoading(false);
  };

  useEffect(() => {
    checkUserData();
    configureGoogleSignIn();
  }, []);

  const configureGoogleSignIn = async () => {
    await GoogleSignin.configure({
      webClientId:
        '443401979985-jumir08cfrt97p23  70p2f6qat6qifhu7.apps.googleusercontent.com',
    });
  };

  const signup = async (email, password) => {
    try {
      const response = await authApi.signup(email, password);
      if (response && response.userId) {
        let isCompletedProfile = false;
        try {
          isCompletedProfile = await authApi.isCompletedProfile(
            response.userId,
          );
        } catch (error) {
          console.error('Error checking profile completion:', error);
        }
        return {
          success: true,
          message: response.message,
          userId: response.userId,
          email: response.email,
          isCompletedProfile,
        };
      }
      return {
        success: false,
        message: response.message || 'Signup failed',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'An error occurred during signup',
      };
    }
  };

  const verifyOTP = async (userId, token) => {
    try {
      const response = await authApi.verifyOTP(userId, token);
      if (response && response.user) {
        setUserData(response.user);
        await storeUserData(response.user);
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const resendOTP = async email => {
    try {
      const response = await authApi.resendOTP(email);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const completeProfile = async profileData => {
    try {
      const response = await authApi.completeProfile(profileData);
      if (response && response.user) {
        const updatedUser = {...response.user, isCompletedProfile: true};
        setUserData(updatedUser);
        await storeUserData(updatedUser);
        return {success: true, user: updatedUser};
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Complete profile error:', error);
      return {
        success: false,
        message: error.message || 'Error completing profile',
      };
    }
  };

  const checkProfileCompletion = async user => {
    try {
      const isCompleted = await authApi.isCompletedProfile(user.id);
      return {...user, isCompletedProfile: isCompleted};
    } catch (error) {
      console.error('Error checking profile completion:', error);
      return user;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authApi.login(email, password);
      if (response && response.user) {
        let isCompletedProfile = false;
        try {
          isCompletedProfile = await authApi.isCompletedProfile(
            response.user.id,
          );
        } catch (error) {
          console.error('Error checking profile completion:', error);
        }
        const updatedUser = {...response.user, isCompletedProfile};
        setUserData(updatedUser);
        await storeUserData(updatedUser);
        return {...response, user: updatedUser};
      }
      return response;
    } catch (error) {
      throw error;
    }
  };

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const response = await authApi.googleSignIn(userInfo);
      if (response && response.user) {
        let isCompletedProfile = false;
        try {
          isCompletedProfile = await authApi.isCompletedProfile(
            response.user.id,
          );
        } catch (error) {
          console.error('Error checking profile completion:', error);
        }
        const updatedUser = {...response.user, isCompletedProfile};
        setUserData(updatedUser);
        await storeUserData(updatedUser);
        return {...response, user: updatedUser};
      }
      return response;
    } catch (error) {
      throw error;
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
      value={{
        isLoading,
        userData,
        signup,
        verifyOTP,
        resendOTP,
        login,
        googleSignIn,
        logout,
        completeProfile,
        checkUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
