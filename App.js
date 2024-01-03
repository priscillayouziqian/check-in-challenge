import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './src/screens/HomeScreen';
import NewChallengeScreen from './src/screens/NewChallengeScreen';
import 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui'
import config from './tamagui.config'

const Drawer = createDrawerNavigator();

export default function App() {
  const [challenges, setChallenges] = useState([]);

  const addChallenge = (newChallenge) => {
    // new state depends on the previous state. so spread operator to create a new array with update value, instead of modifying the existing one.
    setChallenges(prevChallenges => [...prevChallenges, newChallenge]);
  };

  return (
    <TamaguiProvider config={config}>
      <Theme name="light">
         {/*below set up navigation structure: 
            NavigationContainer > Drawer.Navigator > two Drawers (Home and NewChallenge)
         */}
        <NavigationContainer>
          <Drawer.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerStyle: styles.header,
              headerTintColor: styles.headerTint.color,
              headerTitleStyle: styles.headerTitle,
              drawerStyle: styles.drawer,
              drawerActiveTintColor: styles.drawerActiveItem.color,
              drawerInactiveTintColor: styles.drawerInactiveItem.color,
            }}
          >
            <Drawer.Screen 
              name="Home" 
              // make sure all navigation-related props will pass down to HomeScreen(navigate, goBack ...) ---> {...props}
              component={props => <HomeScreen {...props} challenges={challenges} />} 
              options={{
                title: 'Challenge Home',
              }}
            />
            <Drawer.Screen 
              name="NewChallenge" 
              component={props => (
                <NewChallengeScreen 
                  {...props} 
                  onChallengeCreate={addChallenge}
                />
              )}
              options={({ route, navigation }) => ({ 
                title: route.params?.type === 'hours' ? '100 Hours Challenge' : '100 Days Challenge',
                drawerItemStyle: styles.hiddenDrawerItem,
                headerLeft: () => (
                  <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                  >
                    <Text style={styles.backButtonText}>←</Text>
                  </TouchableOpacity>
                ),
              })}
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </Theme>
    </TamaguiProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#4A90E2',
  },
  headerTint: {
    color: '#fff',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  drawer: {
    backgroundColor: '#f5f5f5',
    width: 280,
  },
  drawerActiveItem: {
    color: '#4A90E2',
  },
  drawerInactiveItem: {
    color: '#333',
  },
  hiddenDrawerItem: {
    display: 'none',
  },
  backButton: {
    marginLeft: 15,
    padding: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
  },
});
