import axios from 'axios';
import {API_BASE_URL} from '../utils/constants';

const API_URL = API_BASE_URL;

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};

export const googleSignIn = async googleUser => {
  try {
    const response = await axios.post(`${API_URL}/auth/google-signin`, {
      googleId: googleUser.user.id,
      email: googleUser.user.email,
      firstName: googleUser.user.givenName,
      lastName: googleUser.user.familyName,
      photoURL: googleUser.user.photo,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};

export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};

export const verifyOTP = async (userId, token) => {
  try {
    const response = await axios.post(`${API_URL}/auth/verify-email`, {
      userId,
      token,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};

export const resendOTP = async email => {
  try {
    const response = await axios.post(`${API_URL}/auth/re-verify-email`, {
      email,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};

export const completeProfile = async profileData => {
  try {
    const response = await axios.post(
      `${API_URL}/auth/complete-profile`,
      profileData,
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/auth/logout`);
  } catch (error) {
    console.error('Logout error:', error);
  }
};
