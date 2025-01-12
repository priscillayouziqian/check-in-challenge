import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import { formatDate } from '../features/challenges/utils/dateUtils';

const ChallengeDetailScreen = ({ route }) => {
  const { challenge } = route.params;
  
  // Create array of 100 items for the progress icons
  const progressIcons = Array(100).fill(null);
  
  // State to track completed days
  const [completedDays, setCompletedDays] = useState(
    challenge.type === 'days' 
      ? Math.floor((new Date() - new Date(challenge.startDate)) / (1000 * 60 * 60 * 24))
      : 0
  );

  // Function to toggle completion status
  const toggleCompletion = (index) => {
    setCompletedDays((prevCompletedDays) => {
      // Check if the icon is already completed
      if (prevCompletedDays > index) {
        // If already completed, decrement the count
        return prevCompletedDays - 1;
      } else {
        // If not completed, increment the count
        return prevCompletedDays + 1;
      }
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          source={require('../assets/logo.png')}
          style={styles.cartoonImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>{challenge.challengeName}</Text>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>
            Start: {formatDate(new Date(challenge.startDate))}
          </Text>
          <Text style={styles.dateText}>
            End: {formatDate(new Date(challenge.endDate))}
          </Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Progress Tracker</Text>
        <View style={styles.iconGrid}>
          {progressIcons.map((_, index) => (
            <Icon
              key={index}
              name={index < completedDays ? 'check-circle' : 'circle-o'}
              type="font-awesome"
              color={index < completedDays ? '#4A90E2' : '#ddd'}
              size={24}
              containerStyle={styles.icon}
              onPress={() => toggleCompletion(index)}
            />
          ))}
        </View>
        <Badge
          value={`${completedDays}/${progressIcons.length} ${challenge.type}`}
          status="success"
          containerStyle={styles.badgeContainer}
          badgeStyle={styles.badge}
          textStyle={styles.badgeText}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartoonImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  dateContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  progressContainer: {
    padding: 20,
    marginTop: 20,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  iconGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    margin: 2,
  },
  badgeContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: '#4A90E2',
  },
  badgeText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChallengeDetailScreen; 