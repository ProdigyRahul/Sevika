import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../hooks/useAuth';
import LoadingScreen from '../screens/LoadingScreen';
import TabNavigator from './TabNavigator';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen';
import CompleteProfileScreen from '../screens/CompleteProfileScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {isLoading, userData, checkUserData} = useAuth();
  const [isInitializing, setIsInitializing] = useState(true);
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      await checkUserData();
      setIsInitializing(false);
    };
    initialize();
  }, []);

  const handleLoadingComplete = () => {
    setShowLoadingScreen(false);
  };

  if (isInitializing || isLoading || showLoadingScreen) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {userData ? (
        <>
          {userData.isCompletedProfile ? (
            <Stack.Screen name="MainApp" component={TabNavigator} />
          ) : (
            <>
              <Stack.Screen
                name="CompleteProfile"
                component={CompleteProfileScreen}
              />
              <Stack.Screen name="MainApp" component={TabNavigator} />
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
          <Stack.Screen
            name="CompleteProfile"
            component={CompleteProfileScreen}
          />
          <Stack.Screen name="MainApp" component={TabNavigator} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
