import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import ChallengeCard from '../features/challenges/components/ChallengeCard';

const CompletedChallengesScreen = ({ navigation }) => {
  // Get only completed challenges (completedDays === 100)
  const completedChallenges = useSelector(state => 
    state.challenges.items.filter(challenge => challenge.completedDays === 100)
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Completed Challenges</Text>
        <Text style={styles.subtitle}>
          Congratulations on your achievements! 🎉
        </Text>
      </View>

      {completedChallenges.length > 0 ? (
        <View style={styles.challengesSection}>
          {completedChallenges.map((challenge) => (
            <TouchableOpacity 
              key={challenge.id} 
              onPress={() => navigation.navigate('ChallengeDetail', { challengeId: challenge.id })}
            >
              <ChallengeCard challenge={challenge} />
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>
            No completed challenges yet. Keep going with your current challenges!
          </Text>
        </View>
      )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  challengesSection: {
    padding: 20,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default CompletedChallengesScreen; 