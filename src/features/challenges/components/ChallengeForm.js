import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import DaysChallenge from './DaysChallenge';
import HoursChallenge from './HoursChallenge';
import SubmitButton from './SubmitButton';

const ChallengeForm = ({ 
    //descrtructe all props for easy access
  type, 
  challengeName, 
  setChallengeName, 
  startDate,
  setStartDate,
  endDate,
  onSubmit 
}) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Challenge Name</Text>
      <TextInput
        style={styles.input}
        value={challengeName}
        onChangeText={setChallengeName}
        placeholder="Enter challenge name"
        placeholderTextColor="#999"
      />
      {/* condition check, DaysChallenge or HoursChallenge */}
      {type === 'days' ? (
        <DaysChallenge 
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
        />
      ) : (
        <HoursChallenge />
      )}

      <SubmitButton onPress={onSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

export default ChallengeForm; 