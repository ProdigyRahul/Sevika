import { Bell } from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { defaultColors } from '../constants/Colors';

const ChatListScreen = ({ navigation }) => {
  const chats = [
    {
      id: 1,
      name: 'Teach For Change',
      lastMessage: 'Thank you for volunteering! See you on Saturday.',
      time: '2m ago',
      unread: 2,
      isNGO: true,
    },
    {
      id: 2,
      name: 'Elder Care Foundation',
      lastMessage: 'The elder home visit schedule has been updated.',
      time: '1h ago',
      unread: 0,
      isNGO: true,
    },
    {
      id: 3,
      name: 'Green Earth Initiative',
      lastMessage: 'Perfect! Looking forward to the tree plantation drive.',
      time: '3h ago',
      unread: 1,
      isNGO: true,
    },
    {
      id: 4,
      name: 'Sarah (Volunteer Coordinator)',
      lastMessage: 'Hi! Are you available for the weekend teaching program?',
      time: '1d ago',
      unread: 0,
      isNGO: false,
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Messages</Text>
          <Text style={styles.headerSubtitle}>Stay connected with NGOs and coordinators</Text>
        </View>
        <TouchableOpacity>
          <Bell size={24} color={defaultColors.gray} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations..."
          placeholderTextColor={defaultColors.gray}
        />
      </View>

      {/* Chat List */}
      <ScrollView
        style={styles.chatList}
        showsVerticalScrollIndicator={false}
      >
        {chats.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatDetail', { chat })}
          >
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{chat.name.charAt(0)}</Text>
            </View>

            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName} numberOfLines={1}>{chat.name}</Text>
                <Text style={styles.timeText}>{chat.time}</Text>
              </View>

              <View style={styles.chatFooter}>
                <Text style={styles.messageText} numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
                {chat.unread > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadText}>{chat.unread}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColors.veryLight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: defaultColors.veryLight,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: defaultColors.primary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: defaultColors.gray,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: defaultColors.veryLight,
  },
  searchInput: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    fontSize: 16,
    color: defaultColors.dark,
  },
  chatList: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: defaultColors.veryLight,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: defaultColors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: defaultColors.primary,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
    color: defaultColors.dark,
    flex: 1,
    marginRight: 8,
  },
  timeText: {
    fontSize: 12,
    color: defaultColors.gray,
  },
  chatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 14,
    color: defaultColors.gray,
    flex: 1,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: defaultColors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  unreadText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ChatListScreen;
