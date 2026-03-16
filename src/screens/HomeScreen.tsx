import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/**
 * Home screen — displays the daily quote.
 *
 * Flutter parallel: This is a StatelessWidget page. useSafeAreaInsets()
 * is like wrapping with SafeArea() — it gives you the padding values
 * for notches, status bars, etc. We apply them manually for more control.
 */
const HomeScreen = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Text style={styles.header}>QuoteSpace</Text>
      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>
          "The best way to predict the future is to create it."
        </Text>
        <Text style={styles.author}>— Peter Drucker</Text>
      </View>
      <Text style={styles.hint}>Daily inspiration awaits</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#667eea',
    paddingHorizontal: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  quote: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
  },
  author: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },
  hint: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default HomeScreen;
