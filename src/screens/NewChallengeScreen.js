import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import ChallengeForm from '../features/challenges/components/ChallengeForm';
import { calculateEndDate } from '../features/challenges/utils/dateUtils';

const NewChallengeScreen = ({ route }) => {
  const [challengeName, setChallengeName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(calculateEndDate(new Date()));
  //destructure type property from route.params. Use ?. optional chaining to safely check if type is undefined --> assign default value 'days' if type is not provided, so that it will not throw an error in edge cases. See line 11-13 in HomeScreen.
  const type = route.params?.type || 'days';

  useEffect(() => {
    setEndDate(calculateEndDate(startDate));
  }, [startDate]);

  const handleStartChallenge = () => {
    const challengeData = type === 'days' 
      ? { type, challengeName, startDate, endDate }
      : { type, challengeName, totalHours: 100 };
    console.log('Creating challenge:', challengeData);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.header}>
          Start Your {type === 'days' ? '100 Days' : '100 Hours'} Challenge
        </Text>
         {/* give custom props for ChallengeForm components. pass data and callbacks to ChallengeForm*/}
        <ChallengeForm 
          type={type}
          challengeName={challengeName}
          setChallengeName={setChallengeName}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          onSubmit={handleStartChallenge}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default NewChallengeScreen;
