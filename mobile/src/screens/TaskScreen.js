import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Wrapper from '../components/Wrapper';
import { defaultColors } from '../constants/Colors';

const TaskScreen = () => {
  const [selectedTab, setSelectedTab] = useState('active');

  const activeTasks = [
    {
      id: 1,
      title: 'English Teaching Session',
      organization: 'Literary Foundation',
      date: 'Today, 2:00 PM',
      location: 'Mumbai Central',
      status: 'Upcoming',
      type: 'Education',
      duration: '2 hours',
    },
    {
      id: 2,
      title: 'Elder Care Visit',
      organization: 'Silver Care Home',
      date: 'Tomorrow, 10:00 AM',
      location: 'Andheri East',
      status: 'In Progress',
      type: 'Healthcare',
      duration: '3 hours',
    },
    {
      id: 3,
      title: 'Art Workshop',
      organization: 'Creative Minds NGO',
      date: 'Thu, 3:30 PM',
      location: 'Bandra West',
      status: 'Pending',
      type: 'Arts & Culture',
      duration: '1.5 hours',
    },
  ];

  const completedTasks = [
    {
      id: 4,
      title: 'Reading Workshop',
      organization: 'Kids First NGO',
      date: 'Yesterday',
      location: 'Malad West',
      rating: 5,
      type: 'Education',
      duration: '2 hours',
    },
    {
      id: 5,
      title: 'Medical Camp Support',
      organization: 'Health For All',
      date: 'Last Week',
      location: 'Dadar',
      rating: 4,
      type: 'Healthcare',
      duration: '4 hours',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return '#FFB74D';
      case 'In Progress':
        return '#4CAF50';
      case 'Pending':
        return '#F44336';
      default:
        return defaultColors.primary;
    }
  };

  const renderTaskCard = (task, isCompleted = false) => (
    <TouchableOpacity key={task.id} style={styles.taskCard}>
      <View style={styles.taskHeader}>
        <View style={styles.typeContainer}>
          <Text style={styles.taskType}>{task.type}</Text>
          {!isCompleted && (
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(task.status) },
              ]}>
              <Text style={styles.statusText}>{task.status}</Text>
            </View>
          )}
        </View>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.organizationName}>{task.organization}</Text>
      </View>

      <View style={styles.taskDetails}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Image
              source={require('../assets/images/calendar.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{task.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Image
              source={require('../assets/images/clock.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{task.duration}</Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Image
              source={require('../assets/images/location.png')}
              style={styles.detailIcon}
            />
            <Text style={styles.detailText}>{task.location}</Text>
          </View>
        </View>
      </View>

      {isCompleted && (
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Rating:</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <Text
                key={index}
                style={[
                  styles.star,
                  { color: index < task.rating ? '#FFB74D' : '#C7D0E1' },
                ]}>
                ★
              </Text>
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <Wrapper style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Tasks</Text>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'active' && styles.activeTab]}
          onPress={() => setSelectedTab('active')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'active' && styles.activeTabText,
            ]}>
            Active Tasks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'completed' && styles.activeTab]}
          onPress={() => setSelectedTab('completed')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'completed' && styles.activeTabText,
            ]}>
            Completed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Task List */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {selectedTab === 'active'
          ? activeTasks.map((task) => renderTaskCard(task))
          : completedTasks.map((task) => renderTaskCard(task, true))}
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: defaultColors.veryLight,
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: defaultColors.primary,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#C7D0E1',
  },
  activeTab: {
    borderBottomColor: defaultColors.primary,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: defaultColors.gray,
  },
  activeTabText: {
    color: defaultColors.primary,
  },
  scrollContent: {
    padding: 20,
    gap: 15,
  },
  taskCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: defaultColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskHeader: {
    marginBottom: 15,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskType: {
    color: defaultColors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: defaultColors.dark,
    marginBottom: 5,
  },
  organizationName: {
    fontSize: 14,
    color: defaultColors.gray,
  },
  taskDetails: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    gap: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  detailIcon: {
    width: 16,
    height: 16,
    tintColor: defaultColors.gray,
  },
  detailText: {
    fontSize: 14,
    color: defaultColors.gray,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F1F4FF',
  },
  ratingLabel: {
    fontSize: 14,
    color: defaultColors.gray,
    marginRight: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    marginRight: 2,
  },
});

export default TaskScreen;
