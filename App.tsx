/** QuoteSpace — Daily Quote App. Root component with providers. */

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
