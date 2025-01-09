import React, { useState } from 'react';
import { View,Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatDate } from '../utils/dateUtils';

const DaysChallenge = ({ startDate, setStartDate, endDate }) => {
  const [showStartPicker, setShowStartPicker] = useState(false);

  const onStartDateChange = (event, selectedDate) => {
    // use || to check if no selectedDate, defalt to startDate(unchanged).
    const currentDate = selectedDate || startDate;
    if (Platform.OS === 'android') {
        //date pickers close automatically after a date is selected.
      setShowStartPicker(false);
    }
    if (selectedDate) {
      setStartDate(currentDate);
    }
  };

  const showDatepicker = () => {
    setShowStartPicker(true);
  };

  return (
    <>
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity 
        style={styles.dateButton}
        onPress={showDatepicker}
      >
        <Text style={styles.dateButtonText}>{formatDate(startDate)}</Text>
      </TouchableOpacity>

      <Text style={styles.label}>End Date</Text>
      <View style={styles.dateButton}>
        <Text style={styles.dateButtonText}>{formatDate(endDate)}</Text>
      </View>

      {showStartPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onStartDateChange}
          minimumDate={new Date()}
          style={Platform.OS === 'ios' ? styles.iosDatePicker : undefined}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  dateButton: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  iosDatePicker: {
    width: '100%',
    height: 200,
    marginTop: -10,
  },
});

export default DaysChallenge;