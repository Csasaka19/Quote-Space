import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const FavoritesScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <Text style={styles.subtitle}>Your saved quotes will appear here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#764ba2',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
});

export default FavoritesScreen;
