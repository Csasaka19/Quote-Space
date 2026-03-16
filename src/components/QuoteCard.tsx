import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';
import {Quote} from '../types/quote';

/**
 * Reusable card that displays a quote with favorite and action buttons.
 *
 * Flutter parallel: This is a custom StatelessWidget — a pure UI component
 * that receives data and callbacks via props (like constructor params in Flutter).
 * TouchableOpacity = InkWell/GestureDetector with built-in opacity feedback.
 * ActivityIndicator = CircularProgressIndicator.
 */

interface QuoteCardProps {
  quote: Quote | null;
  loading: boolean;
  error: string | null;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onNewQuote: () => void;
}

const QuoteCard = ({
  quote,
  loading,
  error,
  isFavorite,
  onToggleFavorite,
  onNewQuote,
}: QuoteCardProps) => {
  if (loading) {
    return (
      <View style={[styles.card, styles.centered]}>
        <ActivityIndicator size="large" color="#667eea" />
        <Text style={styles.loadingText}>Finding inspiration...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.card, styles.centered]}>
        <Text style={styles.errorIcon}>!</Text>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={onNewQuote}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!quote) {
    return null;
  }

  return (
    <View style={styles.card}>
      <Text style={styles.quoteText}>"{quote.quote}"</Text>
      <Text style={styles.authorText}>— {quote.author}</Text>
      <Text style={styles.categoryText}>{quote.category}</Text>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onToggleFavorite}
          activeOpacity={0.7}>
          <Text style={[styles.heartIcon, isFavorite && styles.heartFilled]}>
            {isFavorite ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.newQuoteButton}
          onPress={onNewQuote}
          activeOpacity={0.7}>
          <Text style={styles.newQuoteText}>New Quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    padding: 28,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200,
  },
  quoteText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2d3436',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 16,
  },
  authorText: {
    fontSize: 16,
    color: '#636e72',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 4,
  },
  categoryText: {
    fontSize: 12,
    color: '#b2bec3',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 20,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 24,
    color: '#b2bec3',
  },
  heartFilled: {
    color: '#e17055',
  },
  newQuoteButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    backgroundColor: '#667eea',
  },
  newQuoteText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#636e72',
  },
  errorIcon: {
    fontSize: 32,
    fontWeight: '700',
    color: '#d63031',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#636e72',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#667eea',
  },
  retryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default QuoteCard;
