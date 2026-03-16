import React, {createContext, useContext} from 'react';
import {useFavorites} from './useFavorites';
import {Quote} from '../types/quote';

/**
 * Context that shares favorite quotes state across all screens.
 *
 * Flutter parallel: This is exactly like wrapping your MaterialApp with
 * ChangeNotifierProvider<FavoritesModel>. Any child widget (component)
 * can access it via Provider.of or context.watch — here we use useContext().
 *
 * Why a Context? Without it, each screen calling useFavorites() would get
 * its own separate state. Context lifts the state up so Home and Favorites
 * screens share the same list — just like Provider does in Flutter.
 */

interface FavoritesContextType {
  favorites: Quote[];
  loading: boolean;
  addFavorite: (quote: Quote) => void;
  removeFavorite: (quote: Quote) => void;
  isFavorite: (quote: Quote) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({children}: {children: React.ReactNode}) => {
  const favoritesState = useFavorites();
  return (
    <FavoritesContext.Provider value={favoritesState}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      'useFavoritesContext must be used within a FavoritesProvider',
    );
  }
  return context;
};
