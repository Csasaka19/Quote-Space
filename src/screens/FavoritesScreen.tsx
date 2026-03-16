import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useFavoritesContext} from '../hooks/FavoritesContext';

/**
 * Favorites screen — shows all saved quotes.
 *
 * Flutter parallel:
 * - FlatList = ListView.builder (lazy, recycled list — same idea)
 * - useFavoritesContext() = context.watch<FavoritesModel>()
 * - keyExtractor = the `key` property on your list items
 *
 * FlatList only renders items visible on screen, just like ListView.builder.
 * It's the go-to for any scrollable list in React Native.
 */
const FavoritesScreen = () => {
  const insets = useSafeAreaInsets();
  const {favorites, loading} = useFavoritesContext();

  if (loading) {
    return (
      <View style={[styles.container, styles.centered, {paddingTop: insets.top}]}>
        <Text style={styles.loadingText}>Loading favorites...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <Text style={styles.header}>Favorites</Text>
      {favorites.length === 0 ? (
        <View style={[styles.centered, {flex: 1}]}>
          <Text style={styles.emptyIcon}>♥</Text>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the heart on a quote to save it here
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => `${item.author}-${index}`}
          contentContainerStyle={styles.listContent}
          renderItem={({item}) => (
            <View style={styles.card}>
              <Text style={styles.cardQuote}>"{item.quote}"</Text>
              <Text style={styles.cardAuthor}>— {item.author}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#764ba2',
    paddingHorizontal: 24,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  emptyIcon: {
    fontSize: 48,
    color: 'rgba(255,255,255,0.3)',
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  cardQuote: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 8,
  },
  cardAuthor: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontStyle: 'italic',
  },
});

export default FavoritesScreen;
