import createSlug from '../../utils/createSlug';

describe('createSlug utility', () => {
  test('converts string to lowercase slug', () => {
    expect(createSlug('Hello World')).toBe('hello-world');
  });

  test('handles multiple spaces', () => {
    expect(createSlug('Hello  World')).toBe('hello-world');
  });

  test('handles special characters', () => {
    expect(createSlug('Hello & World!')).toBe('hello-world');
  });

  test('handles empty string', () => {
    expect(createSlug('')).toBe('');
  });
});
