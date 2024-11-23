import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Wrapper from '../components/Wrapper';
import {defaultColors} from '../constants/Colors';
import {deviceWidth} from '../constants/Scaling';

const HomeScreen = () => {
  const featuredOpportunities = [
    {
      id: 1,
      title: 'Teach Basic English',
      organization: 'Literary Foundation',
      location: 'Mumbai, MH',
      type: 'Education',
    },
    {
      id: 2,
      title: 'Elder Care Assistant',
      organization: 'Silver Care Home',
      location: 'Delhi, DL',
      type: 'Healthcare',
    },
    {
      id: 3,
      title: 'Children Art Workshop',
      organization: 'Creative Minds NGO',
      location: 'Bangalore, KA',
      type: 'Arts & Culture',
    },
  ];

  const categories = [
    {id: 1, name: 'Education', count: 45},
    {id: 2, name: 'Elder Care', count: 32},
    {id: 3, name: 'Healthcare', count: 28},
    {id: 4, name: 'Environment', count: 23},
  ];

  return (
    <Wrapper style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.nameText}>Rahul!</Text>
          </View>
          <TouchableOpacity style={styles.notificationBadge}>
            <Text style={styles.notificationCount}>R</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Tasks Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>125</Text>
            <Text style={styles.statLabel}>Hours Given</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>8</Text>
            <Text style={styles.statLabel}>NGOs Helped</Text>
          </View>
        </View>

        {/* Featured Opportunities */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Featured Opportunities</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredOpportunities.map(opportunity => (
              <TouchableOpacity
                key={opportunity.id}
                style={styles.opportunityCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.opportunityType}>{opportunity.type}</Text>
                </View>
                <Text style={styles.opportunityTitle}>{opportunity.title}</Text>
                <Text style={styles.organizationName}>
                  {opportunity.organization}
                </Text>
                <Text style={styles.locationText}>{opportunity.location}</Text>
                <TouchableOpacity style={styles.applyButton}>
                  <Text style={styles.applyButtonText}>Apply Now</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Categories Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <View style={styles.categoriesGrid}>
            {categories.map(category => (
              <TouchableOpacity key={category.id} style={styles.categoryCard}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryCount}>{category.count} tasks</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: defaultColors.veryLight,
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 16,
    color: defaultColors.gray,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '800',
    color: defaultColors.primary,
  },
  notificationBadge: {
    backgroundColor: defaultColors.primary,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#F1F4FF',
    padding: 15,
    borderRadius: 15,
    width: (deviceWidth - 60) / 3,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: defaultColors.primary,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: defaultColors.gray,
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: defaultColors.dark,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  opportunityCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginLeft: 20,
    width: deviceWidth * 0.75,
    shadowColor: defaultColors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 10,
  },
  opportunityType: {
    color: defaultColors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  opportunityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: defaultColors.dark,
    marginBottom: 5,
  },
  organizationName: {
    fontSize: 14,
    color: defaultColors.gray,
    marginBottom: 5,
  },
  locationText: {
    fontSize: 14,
    color: defaultColors.gray,
    marginBottom: 15,
  },
  applyButton: {
    backgroundColor: defaultColors.primary,
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 15,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    width: (deviceWidth - 55) / 2,
    shadowColor: defaultColors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: defaultColors.dark,
    marginBottom: 5,
  },
  categoryCount: {
    fontSize: 14,
    color: defaultColors.gray,
  },
});

export default HomeScreen;
