// API
export const API_BASE_URL = 'http://192.168.62.202:8080/api/v1';

// Typography
export const FONT_SIZE = {
  small: 12,
  regular: 16,
  large: 20,
  extraLarge: 24,
};

// Layout
export const SPACING = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

// AsyncStorage Keys
export const STORAGE_KEYS = {
  userToken: 'userToken',
  userInfo: 'userInfo',
};

// Navigation Routes
export const ROUTES = {
  welcome: 'Welcome',
  login: 'Login',
  signup: 'Signup',
  home: 'Home',
  profile: 'Profile',
};

// Validation
export const REGEX = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};

// App Info
export const APP_INFO = {
  name: 'Sevika',
  version: '1.0.0',
  slogan: 'Sahyog Seva Samarpan',
};

// Error Messages
export const ERROR_MESSAGES = {
  generalError: 'An unexpected error occurred. Please try again.',
  networkError: 'Network error. Please check your internet connection.',
  invalidCredentials: 'Invalid email or password.',
  emailAlreadyExists: 'An account with this email already exists.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  loginSuccess: 'Login successful!',
  signupSuccess: 'Account created successfully!',
  passwordReset: 'Password reset email sent.',
};
