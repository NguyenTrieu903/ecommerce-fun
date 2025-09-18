import { formatCurrency, formatPrice } from '../src/utils/formatCurrency';

describe('src/utils/formatCurrency.js Tests', () => {
  
  describe('formatCurrency', () => {
    test('should format a positive amount in USD by default', () => {
      const result = formatCurrency(1234.56);
      expect(result).toBe('$1,234.56');
    });

    test('should format a negative amount in USD by default', () => {
      const result = formatCurrency(-1234.56);
      expect(result).toBe('-$1,234.56');
    });

    test('should format a positive amount in specified currency', () => {
      const result = formatCurrency(1234.56, 'EUR');
      expect(result).toBe('€1,234.56');
    });

    test('should format a negative amount in specified currency', () => {
      const result = formatCurrency(-1234.56, 'EUR');
      expect(result).toBe('-€1,234.56');
    });

    test('should handle zero amount correctly', () => {
      const result = formatCurrency(0);
      expect(result).toBe('$0.00');
    });

    test.each([
      [null, '$0.00'],
      [undefined, '$0.00'],
      ['', '$0.00'],
      [NaN, '$0.00'],
      [Infinity, '$Infinity'],
      [-Infinity, '$-Infinity'],
    ])('should return "$0.00" for invalid amount: %s', (amount, expected) => {
      const result = formatCurrency(amount);
      expect(result).toBe(expected);
    });
  });

  describe('formatPrice', () => {
    test('should return formatted currency for a valid number input', () => {
      const result = formatPrice(1234.56);
      expect(result).toBe('$1,234.56');
    });

    test('should return "$0.00" for non-numeric input', () => {
      const result = formatPrice('not a number');
      expect(result).toBe('$0.00');
    });

    test('should return "$0.00" for null input', () => {
      const result = formatPrice(null);
      expect(result).toBe('$0.00');
    });

    test('should return "$0.00" for undefined input', () => {
      const result = formatPrice(undefined);
      expect(result).toBe('$0.00');
    });

    test('should return "$0.00" for an empty string input', () => {
      const result = formatPrice('');
      expect(result).toBe('$0.00');
    });

    test('should return "$0.00" for NaN input', () => {
      const result = formatPrice(NaN);
      expect(result).toBe('$0.00');
    });

    test('should return "$0.00" for Infinity input', () => {
      const result = formatPrice(Infinity);
      expect(result).toBe('$0.00');
    });

    test('should return "$0.00" for -Infinity input', () => {
      const result = formatPrice(-Infinity);
      expect(result).toBe('$0.00');
    });
  });
});