import React, {createContext, useContext} from 'react';
import {useFavorites} from './useFavorites';
import {Quote} from '../types/quote';

/** Context that shares favorite quotes state across all screens. */

interface FavoritesContextType {
  favorites: Quote[];
  loading: boolean;
  addFavorite: (quote: Quote) => void;
  removeFavorite: (quote: Quote) => void;
  isFavorite: (quote: Quote) => boolean;
  reloadFavorites: () => Promise<void>;
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
