import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import { formatDate } from '../features/challenges/utils/dateUtils';
import { useDispatch, useSelector } from 'react-redux';
import { updateChallengeProgress, deleteChallenge } from '../features/challenges/challengesSlice';
import { CommonActions } from '@react-navigation/native';

const ChallengeDetailScreen = ({ route, navigation }) => {
  const { challengeId } = route.params;
  const dispatch = useDispatch();
  
  // Get the challenge directly from Redux store using the ID
  const challenge = useSelector(state => 
    state.challenges.items.find(item => item.id === challengeId)
  );

  // If challenge doesn't exist, navigate to Home
  useEffect(() => {
    if (!challenge) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        })
      );
    }
  }, [challenge, navigation]);

  // Function to handle challenge deletion
  const handleDelete = () => {
    Alert.alert(
      "Delete Challenge",
      "Are you sure you want to delete this challenge? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            console.log(`Challenge "${challenge.challengeName}" (ID: ${challengeId}) has been deleted`);
            dispatch(deleteChallenge(challengeId));
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              })
            );
          },
          style: "destructive"
        }
      ]
    );
  };

  // Function to toggle completion status and update Redux directly
  const toggleCompletion = (index) => {
    const newCompletedDays = challenge.completedDays > index ? index : index + 1;
    dispatch(updateChallengeProgress({
      challengeId,
      completedDays: newCompletedDays
    }));

    // Show congratulatory message when reaching 100
    if (newCompletedDays === 100) {
      Alert.alert(
        "🎉 Congratulations! 🎉",
        `You've successfully completed your ${challenge.type} challenge: "${challenge.challengeName}"!\n\nThis is a remarkable achievement. Keep up the great work!`,
        [
          {
            text: "Thank you!",
            style: "default"
          }
        ]
      );
    }
  };

  if (!challenge) {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
          <Icon
            name="trash"
            type="font-awesome"
            color="#FF4444"
            size={24}
          />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{challenge.challengeName}</Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>Start Date</Text>
              <Text style={styles.dateText}>
                {formatDate(new Date(challenge.startDate))}
              </Text>
            </View>
            <View style={styles.dateItem}>
              <Text style={styles.dateLabel}>End Date</Text>
              <Text style={styles.dateText}>
                {formatDate(new Date(challenge.endDate))}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Progress Tracker</Text>
        <View style={styles.iconGrid}>
          {Array(100).fill(null).map((_, index) => (
            <Icon
              key={`${challengeId}-${index}`}
              name={index < challenge.completedDays ? 'check-circle' : 'circle-o'}
              type="font-awesome"
              color={index < challenge.completedDays ? '#4A90E2' : '#ddd'}
              size={24}
              containerStyle={styles.icon}
              onPress={() => toggleCompletion(index)}
            />
          ))}
        </View>
        <View style={styles.progressBadgeContainer}>
          <View style={styles.progressBadge}>
            <Text style={styles.progressCount}>{challenge.completedDays}</Text>
            <Text style={styles.progressTotal}>/100 {challenge.type}</Text>
          </View>
        </View>
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
    position: 'relative',
  },
  headerContent: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  dateContainer: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  dateItem: {
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 10,
    minWidth: 140,
  },
  dateLabel: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
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
  progressBadgeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  progressBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  progressCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressTotal: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 5,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    padding: 8,
  },
  backButtonText: {
    color: '#4A90E2',
    fontSize: 24,
  },
  deleteButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    padding: 8,
    zIndex: 1
  }
});

export default ChallengeDetailScreen; 