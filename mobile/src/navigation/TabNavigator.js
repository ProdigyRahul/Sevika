import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import TaskScreen from '../screens/TaskScreen';
import ExploreScreen from '../screens/ExploreScreen';
import ChatListScreen from '../screens/ChatListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {defaultColors} from '../constants/Colors';

import HomeIcon from '../assets/images/home.png';
import TaskIcon from '../assets/images/list.png';
import ExploreIcon from '../assets/images/compass.png';
import ChatIcon from '../assets/images/chat.png';
import ProfileIcon from '../assets/images/account.png';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = HomeIcon;
              break;
            case 'Tasks':
              iconSource = TaskIcon;
              break;
            case 'Explore':
              iconSource = ExploreIcon;
              break;
            case 'Chat':
              iconSource = ChatIcon;
              break;
            case 'Profile':
              iconSource = ProfileIcon;
              break;
            default:
              iconSource = null;
          }

          return (
            <Image
              source={iconSource}
              style={{width: size, height: size, tintColor: color}}
            />
          );
        },
        tabBarActiveTintColor: defaultColors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TaskScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Chat" component={ChatListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
