import {
  Bell,
  ChevronRight,
  Edit2,
  FileText,
  Lock,
  LogOut,
  Mail,
  Shield,
} from 'lucide-react-native';
import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Wrapper from '../components/Wrapper';
import {defaultColors} from '../constants/Colors';
import {useAuth} from '../hooks/useAuth';

const {width} = Dimensions.get('window');

const ProfileScreen = ({navigation}) => {
  const {logout} = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const dummyUserData = {
    name: 'Rahul Mistry',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    location: 'Vadodara, Gujarat',
    volunteerHours: 125,
    eventsAttended: 15,
    ngosSupported: 8,
    profileImage: require('../assets/images/account.png'),
  };

  const menuItems = [
    {
      icon: <Lock color={defaultColors.primary} size={22} />,
      title: 'Change Password',
      onPress: () => navigation.navigate('ChangePassword'),
    },
    {
      icon: <Bell color={defaultColors.primary} size={22} />,
      title: 'Push Notifications',
      isSwitch: true,
      value: notificationsEnabled,
      onValueChange: setNotificationsEnabled,
    },
    {
      icon: <Mail color={defaultColors.primary} size={22} />,
      title: 'Email Notifications',
      isSwitch: true,
      value: emailNotifications,
      onValueChange: setEmailNotifications,
    },
    {
      icon: <Shield color={defaultColors.primary} size={22} />,
      title: 'Privacy Policy',
      onPress: () => navigation.navigate('PrivacyPolicy'),
    },
    {
      icon: <FileText color={defaultColors.primary} size={22} />,
      title: 'Terms of Service',
      onPress: () => navigation.navigate('Terms'),
    },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Logout', onPress: () => logout(), style: 'destructive'},
      ],
      {cancelable: true},
    );
  };

  const MenuItem = ({icon, title, onPress, isSwitch, value, onValueChange}) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
      disabled={isSwitch}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuItemText}>{title}</Text>
      </View>
      {isSwitch ? (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{false: '#767577', true: defaultColors.primary}}
          ios_backgroundColor="#767577"
        />
      ) : (
        <ChevronRight color={defaultColors.gray} size={22} />
      )}
    </TouchableOpacity>
  );

  return (
    <Wrapper style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Cover Image & Profile Section */}
        <View style={styles.coverContainer}>
          <View style={styles.coverImage} />
          <View style={styles.profileImageContainer}>
            <Image
              source={dummyUserData.profileImage}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.editButton}
              onPress={() => navigation.navigate('EditProfile')}>
              <Edit2 color="white" size={16} />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Text style={styles.userName}>{dummyUserData.name}</Text>
          <Text style={styles.userLocation}>{dummyUserData.location}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, {backgroundColor: '#E8F5E9'}]}>
            <Text style={[styles.statNumber, {color: '#2E7D32'}]}>
              {dummyUserData.volunteerHours}
            </Text>
            <Text style={[styles.statLabel, {color: '#2E7D32'}]}>Hours</Text>
          </View>
          <View style={[styles.statCard, {backgroundColor: '#E3F2FD'}]}>
            <Text style={[styles.statNumber, {color: '#1565C0'}]}>
              {dummyUserData.eventsAttended}
            </Text>
            <Text style={[styles.statLabel, {color: '#1565C0'}]}>Events</Text>
          </View>
          <View style={[styles.statCard, {backgroundColor: '#FFF3E0'}]}>
            <Text style={[styles.statNumber, {color: '#E65100'}]}>
              {dummyUserData.ngosSupported}
            </Text>
            <Text style={[styles.statLabel, {color: '#E65100'}]}>NGOs</Text>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Settings</Text>
          {menuItems.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut color="red" size={22} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  scrollContent: {
    flexGrow: 1,
  },
  coverContainer: {
    height: 200,
    width: width,
    backgroundColor: defaultColors.primary,
    position: 'relative',
  },
  coverImage: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: defaultColors.primary,
    opacity: 0.9,
  },
  profileImageContainer: {
    position: 'absolute',
    bottom: -50,
    left: width / 2 - 50,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
  },
  editButton: {
    position: 'absolute',
    right: -8,
    bottom: 8,
    backgroundColor: defaultColors.primary,
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  userInfoContainer: {
    marginTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: defaultColors.dark,
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 16,
    color: defaultColors.gray,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 6,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  menuContainer: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: defaultColors.dark,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 1,
    borderRadius: 12,
    marginBottom: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: defaultColors.dark,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 32,
    marginHorizontal: 20,
    backgroundColor: '#FEE2E2',
    padding: 16,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'red',
    marginLeft: 8,
  },
});

export default ProfileScreen;
