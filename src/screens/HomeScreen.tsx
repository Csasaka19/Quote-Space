import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchRandomQuote} from '../services/quoteService';
import {useFavoritesContext} from '../hooks/FavoritesContext';
import QuoteCard from '../components/QuoteCard';
import {Quote} from '../types/quote';
import {STORAGE_KEYS} from '../utils/constants';

/**
 * Home screen — displays the daily quote with live API integration.
 *
 * Flutter parallel:
 * - useState = individual state variables (like separate ValueNotifiers)
 * - useEffect = initState() — runs once when the screen mounts
 * - useCallback = memoized methods (avoids recreating functions on every render,
 *   like using `const` callbacks in Flutter to avoid unnecessary rebuilds)
 * - async/await works identically to Dart — same syntax, same concept
 *
 * The "daily quote" logic: on first load, we check AsyncStorage for a cached
 * quote from today. If found, show it. If not, fetch a new one and cache it.
 * This is like checking SharedPreferences on initState in Flutter.
 */
const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const {addFavorite, removeFavorite, isFavorite} = useFavoritesContext();

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load the daily quote on mount
  useEffect(() => {
    loadDailyQuote();
  }, []);

  const loadDailyQuote = async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if we have a cached quote from today
      const cachedDate = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_QUOTE_DATE);
      const today = new Date().toDateString();

      if (cachedDate === today) {
        const cachedQuote = await AsyncStorage.getItem(STORAGE_KEYS.DAILY_QUOTE);
        if (cachedQuote) {
          setQuote(JSON.parse(cachedQuote));
          setLoading(false);
          return;
        }
      }

      // Fetch a fresh quote
      const freshQuote = await fetchRandomQuote();
      setQuote(freshQuote);

      // Cache it as today's daily quote
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_QUOTE, JSON.stringify(freshQuote));
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_QUOTE_DATE, today);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quote');
    } finally {
      setLoading(false);
    }
  };

  const fetchNewQuote = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const freshQuote = await fetchRandomQuote();
      setQuote(freshQuote);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quote');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToggleFavorite = useCallback(() => {
    if (!quote) {
      return;
    }
    if (isFavorite(quote)) {
      removeFavorite(quote);
    } else {
      addFavorite(quote);
    }
  }, [quote, isFavorite, addFavorite, removeFavorite]);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Text style={styles.header}>QuoteSpace</Text>
      <Text style={styles.subtitle}>Daily Inspiration</Text>

      <View style={styles.cardWrapper}>
        <QuoteCard
          quote={quote}
          loading={loading}
          error={error}
          isFavorite={quote ? isFavorite(quote) : false}
          onToggleFavorite={handleToggleFavorite}
          onNewQuote={fetchNewQuote}
        />
      </View>

      <Text style={styles.hint}>
        {quote && !loading ? 'Tap ♡ to save • New Quote for more' : ''}
      </Text>
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
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  hint: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default HomeScreen;
