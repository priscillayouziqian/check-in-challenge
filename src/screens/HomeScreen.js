import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ChallengeCard from '../features/challenges/components/ChallengeCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const challenges = useSelector(state => state.challenges.items);

  const handleChallengePress = (challengeType) => {
    navigation.navigate('NewChallenge', { type: challengeType });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.buttonsSection}>
        <Text style={styles.title}>Accept Your Challenge</Text>
        
        <TouchableOpacity
          style={[styles.challengeButton, styles.daysButton]}
          onPress={() => handleChallengePress('days')}
        >
          <Text style={styles.buttonTitle}>100 Days Challenge</Text>
          <Text style={styles.buttonSubtitle}>Change your life one day at a time</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.challengeButton, styles.hoursButton]}
          onPress={() => handleChallengePress('hours')}
        >
          <Text style={styles.buttonTitle}>100 Hours Challenge</Text>
          <Text style={styles.buttonSubtitle}>Master a skill via focused practice</Text>
        </TouchableOpacity>
      </View>

      {/* scrollable section to display existing challenge. JSX with .map*/}
      {challenges.length > 0 && (
        <View style={styles.challengesSection}>
          <Text style={styles.sectionTitle}>Check-in Challenge</Text>
          {challenges.map((challenge) => (
            <TouchableOpacity 
              key={challenge.id} 
              onPress={() => navigation.navigate('ChallengeDetail', { challengeId: challenge.id })}
            >
              <ChallengeCard challenge={challenge} />
            </TouchableOpacity>
          ))}
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
  buttonsSection: {
    padding: 20,
  },
  challengesSection: {
    padding: 20,
    paddingTop: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  challengeButton: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  daysButton: {
    backgroundColor: '#4A90E2',
  },
  hoursButton: {
    backgroundColor: '#50C878',
  },
  buttonTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  buttonSubtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
});

export default HomeScreen;
