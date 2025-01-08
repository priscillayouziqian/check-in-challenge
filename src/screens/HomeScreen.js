import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleChallengePress = (challengeType) => {
    navigation.navigate('NewChallenge', { type: challengeType });
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
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
