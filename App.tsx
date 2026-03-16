/**
 * QuoteSpace — Daily Quote App
 * Root component that wraps the app with necessary providers.
 *
 * Flutter parallel: This is your MaterialApp widget.
 * SafeAreaProvider = SafeArea widget in Flutter.
 * StatusBar = SystemChrome.setSystemUIOverlayStyle().
 */

import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

export default App;
