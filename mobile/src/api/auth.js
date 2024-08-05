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

export const signup = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {email, password});
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`);
  } catch (error) {
    console.error('Logout error:', error);
  }
};