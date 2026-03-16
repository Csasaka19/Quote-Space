import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

/**
 * Bottom tab navigator with Home and Favorites screens.
 *
 * Flutter parallel:
 * - NavigationContainer = MaterialApp (wraps everything, holds navigation state)
 * - createBottomTabNavigator = BottomNavigationBar + IndexedStack
 * - Tab.Screen = each route/page in your BottomNavigationBar items
 *
 * In Flutter you'd manage the selected index with setState or a provider.
 * React Navigation handles that internally — you just declare the screens.
 */

const Tab = createBottomTabNavigator();

const TabIcon = ({label, focused}: {label: string; focused: boolean}) => (
  <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
    {label === 'Home' ? '✦' : '♥'}
  </Text>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#667eea',
          tabBarInactiveTintColor: '#999',
          tabBarLabelStyle: styles.tabLabel,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon label="Home" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarIcon: ({focused}) => (
              <TabIcon label="Favorites" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    height: 60,
    paddingBottom: 8,
    paddingTop: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  tabIcon: {
    fontSize: 20,
    color: '#999',
  },
  tabIconFocused: {
    color: '#667eea',
  },
});

export default AppNavigator;
