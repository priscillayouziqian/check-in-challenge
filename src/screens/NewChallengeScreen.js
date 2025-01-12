import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, Alert, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { addChallenge } from '../features/challenges/challengesSlice';
import ChallengeForm from '../features/challenges/components/ChallengeForm';
import { calculateEndDate, formatDate } from '../features/challenges/utils/dateUtils';
import DateTimePicker from '@react-native-community/datetimepicker';

const NewChallengeScreen = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const [challengeName, setChallengeName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(calculateEndDate(new Date()));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const type = route.params?.type || 'days';

  useEffect(() => {
    if (type === 'days') {
      setEndDate(calculateEndDate(startDate));
    }
  }, [startDate, type]);

  const onStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

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
    const challengeData = {
      type,
      challengeName,
      startDate: startDate ? startDate.toISOString() : null,
      endDate: endDate ? endDate.toISOString() : null,
    };

    // Add totalHours property if the type is 'hours'
    if (type === 'hours') {
      challengeData.totalHours = 100;
    }
    // Now challengeData contains all the necessary properties
    console.log(challengeData);

    dispatch(addChallenge(challengeData));
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

    // Show confirmation alert with dates for both challenge types
    Alert.alert(
      "Challenge Details",
      `Please confirm your challenge details:
      
Type: ${type === 'days' ? '100 Days' : '100 Hours'} Challenge
Name: ${challengeName}
Start Date: ${formatDate(startDate)}
End Date: ${formatDate(endDate)}`,
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
        <ChallengeForm 
          type={type}
          challengeName={challengeName}
          setChallengeName={setChallengeName}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
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
  dateButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default NewChallengeScreen;
