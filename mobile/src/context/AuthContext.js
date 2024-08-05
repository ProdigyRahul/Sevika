import React, {createContext, useState, useEffect} from 'react';
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
  }, []);

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

  const signup = async (email, password) => {
    try {
      const response = await authApi.signup(email, password);
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
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
      setUserData(null);
      await removeUserData();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{isLoading, userData, login, signup, logout}}>
      {children}
    </AuthContext.Provider>
  );
};
