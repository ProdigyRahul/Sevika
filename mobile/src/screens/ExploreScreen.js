import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Wrapper from '../components/Wrapper';
import { defaultColors } from '../constants/Colors';
import { deviceWidth } from '../constants/Scaling';

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Education' },
    { id: 3, name: 'Healthcare' },
    { id: 4, name: 'Elder Care' },
    { id: 5, name: 'Environment' },
  ];

  const featuredNGOs = [
    {
      id: 1,
      name: 'Teach For Change',
      category: 'Education',
      rating: 4.8,
      volunteers: 250,
      image: require('../assets/images/location.png'),
      location: 'Mumbai, MH',
    },
    {
      id: 2,
      name: 'Elder Care Foundation',
      category: 'Elder Care',
      rating: 4.9,
      volunteers: 180,
      image: require('../assets/images/location.png'),
      location: 'Delhi, DL',
    },
    {
      id: 3,
      name: 'Green Earth Initiative',
      category: 'Environment',
      rating: 4.7,
      volunteers: 320,
      image: require('../assets/images/location.png'),
      location: 'Bangalore, KA',
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Weekend Teaching Drive',
      ngo: 'Teach For Change',
      date: 'This Saturday',
      volunteers: 15,
      category: 'Education',
    },
    {
      id: 2,
      title: 'Elder Home Visit Program',
      ngo: 'Elder Care Foundation',
      date: 'Next Sunday',
      volunteers: 8,
      category: 'Elder Care',
    },
    {
      id: 3,
      title: 'Tree Plantation Drive',
      ngo: 'Green Earth Initiative',
      date: 'Next Weekend',
      volunteers: 25,
      category: 'Environment',
    },
  ];

  return (
    <Wrapper style={styles.wrapper}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSubtitle}>
            Discover opportunities to make a difference
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Image
            source={require('../assets/images/location.png')}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search NGOs, events, or causes..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={defaultColors.gray}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}>
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryPill,
                selectedCategory === category.name && styles.selectedCategoryPill,
              ]}
              onPress={() => setSelectedCategory(category.name)}>
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.name &&
                  styles.selectedCategoryText,
                ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured NGOs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured NGOs</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {featuredNGOs.map(ngo => (
              <TouchableOpacity key={ngo.id} style={styles.ngoCard}>
                <Image source={ngo.image} style={styles.ngoImage} />
                <View style={styles.ngoInfo}>
                  <Text style={styles.ngoCategory}>{ngo.category}</Text>
                  <Text style={styles.ngoName}>{ngo.name}</Text>
                  <Text style={styles.ngoLocation}>{ngo.location}</Text>
                  <View style={styles.ngoStats}>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>★ {ngo.rating}</Text>
                    </View>
                    <View style={styles.statItem}>
                      <Text style={styles.statValue}>
                        {ngo.volunteers} volunteers
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Events Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {upcomingEvents.map(event => (
            <TouchableOpacity key={event.id} style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <View>
                  <Text style={styles.eventCategory}>{event.category}</Text>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventNgo}>{event.ngo}</Text>
                </View>
                <TouchableOpacity style={styles.joinButton}>
                  <Text style={styles.joinButtonText}>Join</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.eventDetails}>
                <View style={styles.detailItem}>
                  <Image
                    source={require('../assets/images/calendar.png')}
                    style={styles.detailIcon}
                  />
                  <Text style={styles.detailText}>{event.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Image
                    source={require('../assets/images/account.png')}
                    style={styles.detailIcon}
                  />
                  <Text style={styles.detailText}>
                    {event.volunteers} volunteers needed
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: defaultColors.primary,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: defaultColors.gray,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: defaultColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: defaultColors.gray,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: defaultColors.dark,
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'white',
    marginRight: 10,
    shadowColor: defaultColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCategoryPill: {
    backgroundColor: defaultColors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: defaultColors.gray,
  },
  selectedCategoryText: {
    color: 'white',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: defaultColors.dark,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  ngoCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginLeft: 20,
    width: deviceWidth * 0.7,
    shadowColor: defaultColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ngoImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  ngoInfo: {
    padding: 15,
  },
  ngoCategory: {
    color: defaultColors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  ngoName: {
    fontSize: 18,
    fontWeight: '700',
    color: defaultColors.dark,
    marginBottom: 5,
  },
  ngoLocation: {
    fontSize: 14,
    color: defaultColors.gray,
    marginBottom: 10,
  },
  ngoStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 14,
    color: defaultColors.gray,
    fontWeight: '600',
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: defaultColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  eventCategory: {
    color: defaultColors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: defaultColors.dark,
    marginBottom: 5,
  },
  eventNgo: {
    fontSize: 14,
    color: defaultColors.gray,
  },
  joinButton: {
    backgroundColor: defaultColors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  eventDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailIcon: {
    width: 16,
    height: 16,
    tintColor: defaultColors.gray,
    marginRight: 5,
  },
  detailText: {
    fontSize: 14,
    color: defaultColors.gray,
  },
});

export default ExploreScreen;
