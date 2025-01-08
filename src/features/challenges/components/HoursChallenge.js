import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HoursChallenge = () => (
  <Text style={styles.hoursInfo}>
    Track your progress as you complete 100 hours of focused practice
  </Text>
);

const styles = StyleSheet.create({
  hoursInfo: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    lineHeight: 22,
  },
});

export default HoursChallenge; 