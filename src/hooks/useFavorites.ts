import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Quote} from '../types/quote';
import {STORAGE_KEYS} from '../utils/constants';

/**
 * Custom hook for managing favorite quotes with AsyncStorage persistence.
 *
 * Flutter parallel: This is like a ChangeNotifier + SharedPreferences combo.
 * - useState = ValueNotifier / setState
 * - useEffect = initState + didChangeDependencies
 * - useCallback = memoized method (prevents unnecessary rebuilds)
 *
 * In Flutter you'd wrap this in a Provider. In React, hooks ARE the provider
 * pattern — any component that calls useFavorites() gets its own connection
 * to this state. We'll later lift this into a Context so all screens share
 * the same favorites list (like Provider.of<Favorites>(context) in Flutter).
 */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from AsyncStorage on mount (like initState in Flutter)
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (updated: Quote[]) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.FAVORITES,
        JSON.stringify(updated),
      );
    } catch (error) {
      console.error('Failed to save favorites:', error);
    }
  };

  const addFavorite = useCallback(
    (quote: Quote) => {
      const alreadyExists = favorites.some(
        fav => fav.quote === quote.quote && fav.author === quote.author,
      );
      if (alreadyExists) {
        return;
      }
      const updated = [quote, ...favorites];
      setFavorites(updated);
      saveFavorites(updated);
    },
    [favorites],
  );

  const removeFavorite = useCallback(
    (quote: Quote) => {
      const updated = favorites.filter(
        fav => !(fav.quote === quote.quote && fav.author === quote.author),
      );
      setFavorites(updated);
      saveFavorites(updated);
    },
    [favorites],
  );

  const isFavorite = useCallback(
    (quote: Quote) => {
      return favorites.some(
        fav => fav.quote === quote.quote && fav.author === quote.author,
      );
    },
    [favorites],
  );

  return {favorites, loading, addFavorite, removeFavorite, isFavorite};
};
