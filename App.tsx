/**
 * QuoteSpace — Daily Quote App
 * Root component that wraps the app with necessary providers.
 *
 * Flutter parallel: This is your MaterialApp widget, wrapped with
 * MultiProvider (SafeAreaProvider + FavoritesProvider).
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FavoritesProvider} from './src/hooks/FavoritesContext';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
        <AppNavigator />
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}

export default App;
