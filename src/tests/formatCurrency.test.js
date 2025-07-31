import { formatCurrency, formatPrice } from '../src/utils/formatCurrency';

describe('src/utils/formatCurrency.js Tests', () => {
  describe('formatCurrency', () => {
    test('should format currency correctly for USD by default', () => {
      const result = formatCurrency(1000);
      expect(result).toBe('$1,000.00');
    });

    test('should format currency correctly for specified currency', () => {
      const result = formatCurrency(1000, 'EUR');
      expect(result).toBe('€1,000.00');
    });

    test('should handle negative amounts correctly', () => {
      const result = formatCurrency(-500);
      expect(result).toBe('-$500.00');
    });

    test('should format currency with decimal values correctly', () => {
      const result = formatCurrency(1234.56);
      expect(result).toBe('$1,234.56');
    });

    test('should return "$0.00" for non-numeric amount', () => {
      const result = formatCurrency('not a number');
      expect(result).toBe('$NaN');
    });

    test('should handle null and undefined amounts gracefully', () => {
      expect(formatCurrency(null)).toBe('$0.00');
      expect(formatCurrency(undefined)).toBe('$0.00');
    });
  });

  describe('formatPrice', () => {
    test('should format valid numeric price correctly', () => {
      const result = formatPrice(29.99);
      expect(result).toBe('$29.99');
    });

    test('should return "$0.00" for non-numeric price input', () => {
      expect(formatPrice('invalid')).toBe('$0.00');
      expect(formatPrice(null)).toBe('$0.00');
      expect(formatPrice(undefined)).toBe('$0.00');
      expect(formatPrice([])).toBe('$0.00');
      expect(formatPrice({})).toBe('$0.00');
    });

    test('should return "$0.00" for negative price input', () => {
      const result = formatPrice(-10);
      expect(result).toBe('$-10.00');
    });

    test('should return "$0.00" for zero price', () => {
      const result = formatPrice(0);
      expect(result).toBe('$0.00');
    });

    test('should handle large numbers correctly', () => {
      const result = formatPrice(1000000);
      expect(result).toBe('$1,000,000.00');
    });
  });
});