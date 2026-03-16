import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity, Share} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {useFavoritesContext} from '../hooks/FavoritesContext';
import {Quote} from '../types/quote';

/**
 * Favorites screen — browse and manage saved quotes.
 *
 * Flutter parallel:
 * - Dismissible widget = swipe-to-delete. Here we use a button instead for
 *   clearer UX, but you could add Swipeable from react-native-gesture-handler
 *   for the same swipe behavior as Flutter's Dismissible.
 * - Share.share() = share_plus package — same native share sheet.
 */

const shareQuote = async (quote: Quote) => {
  try {
    await Share.share({
      message: `"${quote.quote}" — ${quote.author}\n\nShared via QuoteSpace`,
    });
  } catch {
    // User cancelled share
  }
};

const FavoritesScreen = () => {
  const insets = useSafeAreaInsets();
  const {favorites, loading, removeFavorite} = useFavoritesContext();

  if (loading) {
    return (
      <LinearGradient
        colors={['#764ba2', '#667eea']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}>
        <View style={[styles.container, styles.centered, {paddingTop: insets.top}]}>
          <Text style={styles.loadingText}>Loading favorites...</Text>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={['#764ba2', '#667eea']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.gradient}>
      <View style={[styles.container, {paddingTop: insets.top}]}>
        <Text style={styles.header}>Favorites</Text>
        <Text style={styles.count}>
          {favorites.length} {favorites.length === 1 ? 'quote' : 'quotes'} saved
        </Text>
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
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.card}>
                <Text style={styles.cardQuote}>"{item.quote}"</Text>
                <Text style={styles.cardAuthor}>— {item.author}</Text>
                <Text style={styles.cardCategory}>{item.category}</Text>

                <View style={styles.cardActions}>
                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => shareQuote(item)}
                    activeOpacity={0.7}>
                    <Text style={styles.cardButtonText}>↗ Share</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.cardButton, styles.removeButton]}
                    onPress={() => removeFavorite(item)}
                    activeOpacity={0.7}>
                    <Text style={styles.removeButtonText}>✕ Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    marginTop: 16,
  },
  count: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    marginTop: 4,
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
    marginBottom: 2,
  },
  cardCategory: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
  },
  cardActions: {
    flexDirection: 'row',
    gap: 10,
  },
  cardButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  cardButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  removeButton: {
    backgroundColor: 'rgba(214,48,49,0.3)',
  },
  removeButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fab1a0',
  },
});

export default FavoritesScreen;
