import {useState, useEffect, useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Quote} from '../types/quote';
import {STORAGE_KEYS} from '../utils/constants';

/** Custom hook for managing favorite quotes with AsyncStorage persistence. */
export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites from AsyncStorage on mount
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

  return {favorites, loading, addFavorite, removeFavorite, isFavorite, reloadFavorites: loadFavorites};
};
