import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { calculateDaysCompleted } from '../utils/dateUtils';

const ChallengeCard = ({ challenge }) => {
  const getProgressText = () => {
    if (challenge.type === 'days') {
      const today = new Date();
      const start = new Date(challenge.startDate);
      
      const validDaysCompleted = calculateDaysCompleted(today, start);
      return `${validDaysCompleted} of 100`;
    }
    return '0 of 100';
  };

  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <View style={styles.leftSection}>
          <Text 
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {challenge.challengeName}
          </Text>
          <Text style={[
            styles.badge, 
            { backgroundColor: challenge.type === 'days' ? '#4A90E2' : '#50C878' }
          ]}>
            {challenge.type === 'days' ? '100 Days' : '100 Hours'}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.progress}>{getProgressText()}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
    flex: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
    overflow: 'hidden',
  },
  progress: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

export default ChallengeCard; 