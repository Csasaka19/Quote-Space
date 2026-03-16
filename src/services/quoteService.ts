import {Quote} from '../types/quote';
import {API_BASE_URL} from '../utils/constants';
import {API_NINJAS_KEY} from '@env';

/**
 * Fetches a random quote from the API Ninjas quotes endpoint.
 *
 * Flutter parallel: This is like a Repository class method that calls
 * http.get() — same concept, just using fetch() instead of the http package.
 */
export const fetchRandomQuote = async (): Promise<Quote> => {
  const response = await fetch(`${API_BASE_URL}/quotes`, {
    headers: {
      'X-Api-Key': API_NINJAS_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data: Quote[] = await response.json();

  if (!data.length) {
    throw new Error('No quotes returned from API');
  }

  return data[0];
};
