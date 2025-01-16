import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store/store';
import HomeScreen from './src/screens/HomeScreen';
import NewChallengeScreen from './src/screens/NewChallengeScreen';
import ChallengeDetailScreen from './src/screens/ChallengeDetailScreen';
import CompletedChallengesScreen from './src/screens/CompletedChallengesScreen';
import ShareAppScreen from './src/screens/ShareAppScreen';
import { Icon } from 'react-native-elements';
import 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui'
import config from './tamagui.config'

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    //set up provider and persistGate for redux-persist
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TamaguiProvider config={config}>
          <Theme name="light">
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
                  component={HomeScreen}
                  options={{
                    title: 'Home',
                    drawerIcon: ({ focused, color }) => (
                      <Icon
                        name="home"
                        type="font-awesome"
                        size={24}
                        color={color}
                      />
                    ),
                  }}
                />
                <Drawer.Screen 
                  name="CompletedChallenges" 
                  component={CompletedChallengesScreen}
                  options={{
                    title: 'Completed Challenges',
                    drawerIcon: ({ focused, color }) => (
                      <Icon
                        name="trophy"
                        type="font-awesome"
                        size={24}
                        color={color}
                      />
                    ),
                  }}
                />
                <Drawer.Screen 
                  name="ShareApp" 
                  component={ShareAppScreen}
                  options={{
                    title: 'Share the App',
                    drawerIcon: ({ focused, color }) => (
                      <Icon
                        name="share-alt"
                        type="font-awesome"
                        size={24}
                        color={color}
                      />
                    ),
                  }}
                />
                <Drawer.Screen 
                  name="NewChallenge" 
                  component={NewChallengeScreen}
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
                <Drawer.Screen 
                  name="ChallengeDetail" 
                  component={ChallengeDetailScreen}
                  options={({ route }) => ({ 
                    title: route.params?.challenge?.challengeName || 'Challenge Details',
                    drawerItemStyle: styles.hiddenDrawerItem,
                  })}
                />
              </Drawer.Navigator>
            </NavigationContainer>
          </Theme>
        </TamaguiProvider>
      </PersistGate>
    </Provider>
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
