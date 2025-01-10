const NewChallengeScreen = ({ route, navigation }) => {
  // ... other state and hooks remain the same

  const createChallenge = () => {
    const challengeData = type === 'days'
      ? { 
          type, 
          challengeName, 
          startDate: new Date(startDate), // Ensure it's a Date object
          endDate: new Date(endDate),     // Ensure it's a Date object
        }
      : { 
          type, 
          challengeName, 
          totalHours: 100 
        };
    
    dispatch(addChallenge(challengeData));
    showSuccessAlert(challengeData);
  };

  // ... rest of the component remains the same
}; 