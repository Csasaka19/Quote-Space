import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchRandomQuote} from '../services/quoteService';
import {useFavoritesContext} from '../hooks/FavoritesContext';
import QuoteCard from '../components/QuoteCard';
import GradientBackground from '../components/GradientBackground';
import {Quote} from '../types/quote';
import {STORAGE_KEYS} from '../utils/constants';

/**
 * Home screen — daily quote with animated gradient background.
 *
 * Flutter parallel:
 * - The gradient index increments on each new quote, triggering
 *   GradientBackground to animate — like updating a ValueNotifier
 *   that an AnimatedBuilder listens to in Flutter.
 */
const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const {addFavorite, removeFavorite, isFavorite} = useFavoritesContext();

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [gradientIndex, setGradientIndex] = useState(0);

  useEffect(() => {
    loadDailyQuote();
  }, []);

  const loadDailyQuote = async () => {
    setLoading(true);
    setError(null);

    try {
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

      const freshQuote = await fetchRandomQuote();
      setQuote(freshQuote);

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
      setGradientIndex(prev => prev + 1);
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
    <GradientBackground colorIndex={gradientIndex}>
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
          {quote && !loading ? 'Tap ♡ to save • ↗ to share' : ''}
        </Text>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
