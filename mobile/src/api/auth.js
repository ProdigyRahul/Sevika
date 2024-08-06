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
    console.log('Sending request to:', `${API_URL}/auth/complete-profile`);
    console.log('Profile data:', profileData);

    const formData = new FormData();
    Object.keys(profileData).forEach(key => {
      if (key === 'profileImage') {
        formData.append('profileImage', profileData[key]);
      } else {
        formData.append(key, profileData[key]);
      }
    });

    const response = await axios.post(
      `${API_URL}/auth/complete-profile`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log('Response received:', response.data);
    return response.data;
  } catch (error) {
    console.error('Complete profile error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received');
      throw new Error('No response received from the server');
    } else {
      console.error('Error', error.message);
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

export const isCompletedProfile = async userId => {
  try {
    const response = await axios.post(`${API_URL}/auth/is-completed-profile`, {
      userId,
    });
    return response.data.isCompletedProfile;
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
