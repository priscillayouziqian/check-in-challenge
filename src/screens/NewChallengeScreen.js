import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import ChallengeForm from '../features/challenges/components/ChallengeForm';
import { calculateEndDate, formatDate } from '../features/challenges/utils/dateUtils';

const NewChallengeScreen = ({ route, navigation }) => {
  const [challengeName, setChallengeName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(calculateEndDate(new Date()));
  //destructure type property from route.params. Use ?. optional chaining to safely check if type is undefined --> assign default value 'days' if type is not provided, so that it will not throw an error in edge cases. See line 11-13 in HomeScreen.
  const type = route.params?.type || 'days';

  useEffect(() => {
    setEndDate(calculateEndDate(startDate));
  }, [startDate]);

  // reset form data
  const resetForm = () => {
    setChallengeName('');
    setStartDate(new Date());
    setEndDate(calculateEndDate(new Date()));
  };

  // show success alert and navigate back to home page
  const showSuccessAlert = (challengeData) => {
    Alert.alert(
      "Success!", 
      "Your challenge has been created.", 
      [
        {
          text: "OK",
          onPress: () => {
            console.log("Challenge created:", challengeData);
            resetForm(); // Reset form before navigation
            navigation.navigate("Home");
          }
        }
      ]
    );
  };

  // create a new challenge
  const createChallenge = () => {
    const challengeData = type === 'days'
      ? { type, challengeName, startDate, endDate }
      : { type, challengeName, totalHours: 100 };
    
    showSuccessAlert(challengeData);
  };

  const handleStartChallenge = () => {
    // Validate challenge name
    if (!challengeName.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter a challenge name",
        [{ text: "OK" }]
      );
      return;
    }

    // Show confirmation alert
    Alert.alert(
      "Challenge Details",
      `Please confirm your challenge details:
      
Type: ${type === 'days' ? '100 Days' : '100 Hours'} Challenge
Name: ${challengeName}${type === 'days' ? `
Start Date: ${formatDate(startDate)}
End Date: ${formatDate(endDate)}` : ''}`,
      [
        {
          text: "Cancel",
          onPress: () => console.log(challengeName + ' - Creation cancelled'),
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: createChallenge
        },
      ],
      { cancelable: false } //Android only
    );
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
