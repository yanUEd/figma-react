import {
  parseToken,
  parseColorToken,
  parseSizeToken,
  parseSpacingToken,
  parseBorderToken,
  parseOpacityToken,
  getStrokeDefaults
} from '../../layout/utils/tokenUtils';

describe('tokenUtils', () => {
  describe('parseToken', () => {
    it('should return null for null or undefined input', () => {
      expect(parseToken(null)).toBeNull();
      expect(parseToken(undefined)).toBeNull();
      expect(parseToken('')).toBeNull();
    });

    it('should convert tokens to CSS variables', () => {
      expect(parseToken('$primary')).toBe('var(--primary)');
      expect(parseToken('$text-color')).toBe('var(--text-color)');
      expect(parseToken('$spacing-lg')).toBe('var(--spacing-lg)');
    });

    it('should return original value for non-token input', () => {
      expect(parseToken('10px')).toBe('10px');
      expect(parseToken('red')).toBe('red');
      expect(parseToken('solid')).toBe('solid');
      expect(parseToken('#ffffff')).toBe('#ffffff');
    });

    it('should handle edge cases', () => {
      expect(parseToken('$')).toBe('var(--)');
      expect(parseToken('$123')).toBe('var(--123)');
      expect(parseToken('$$double')).toBe('var(--$double)');
    });
  });

  describe('parseColorToken', () => {
    it('should return null for null or undefined input', () => {
      expect(parseColorToken(null)).toBeNull();
      expect(parseColorToken(undefined)).toBeNull();
      expect(parseColorToken('')).toBeNull();
    });

    it('should convert color tokens with fallback', () => {
      expect(parseColorToken('$primary')).toBe('var(--primary, #000000)');
      expect(parseColorToken('$text-color', '#ff0000')).toBe('var(--text-color, #ff0000)');
    });

    it('should return original color for non-token input', () => {
      expect(parseColorToken('red')).toBe('red');
      expect(parseColorToken('#ffffff')).toBe('#ffffff');
      expect(parseColorToken('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)');
    });

    it('should use custom fallback', () => {
      expect(parseColorToken('$nonexistent', '#ff0000')).toBe('var(--nonexistent, #ff0000)');
      expect(parseColorToken('$nonexistent', 'transparent')).toBe('var(--nonexistent, transparent)');
    });

    it('should use default fallback (#000000)', () => {
      expect(parseColorToken('$nonexistent')).toBe('var(--nonexistent, #000000)');
    });
  });

  describe('parseSizeToken', () => {
    it('should work like parseToken', () => {
      expect(parseSizeToken('$size-md')).toBe('var(--size-md)');
      expect(parseSizeToken('20px')).toBe('20px');
      expect(parseSizeToken(null)).toBeNull();
    });
  });

  describe('parseSpacingToken', () => {
    it('should work like parseToken', () => {
      expect(parseSpacingToken('$spacing-lg')).toBe('var(--spacing-lg)');
      expect(parseSpacingToken('10px')).toBe('10px');
      expect(parseSpacingToken(null)).toBeNull();
    });
  });

  describe('parseBorderToken', () => {
    it('should work like parseToken', () => {
      expect(parseBorderToken('$border-color')).toBe('var(--border-color)');
      expect(parseBorderToken('1px solid #ccc')).toBe('1px solid #ccc');
      expect(parseBorderToken(null)).toBeNull();
    });
  });

  describe('parseOpacityToken', () => {
    it('should return null for null or undefined input', () => {
      expect(parseOpacityToken(null)).toBeNull();
      expect(parseOpacityToken(undefined)).toBeNull();
      expect(parseOpacityToken('')).toBeNull();
    });

    it('should convert opacity tokens to CSS variables', () => {
      expect(parseOpacityToken('$opacity-disabled')).toBe('var(--opacity-disabled)');
      expect(parseOpacityToken('$opacity-hover')).toBe('var(--opacity-hover)');
    });

    it('should return valid opacity values', () => {
      expect(parseOpacityToken('0')).toBe('0');
      expect(parseOpacityToken('0.5')).toBe('0.5');
      expect(parseOpacityToken('1')).toBe('1');
      expect(parseOpacityToken('0.75')).toBe('0.75');
    });

    it('should return null for invalid opacity values', () => {
      expect(parseOpacityToken('-1')).toBeNull();
      expect(parseOpacityToken('1.5')).toBeNull();
      expect(parseOpacityToken('2')).toBeNull();
      expect(parseOpacityToken('invalid')).toBeNull();
      expect(parseOpacityToken('NaN')).toBeNull();
      expect(parseOpacityToken('')).toBeNull();
    });

    it('should handle string number edge cases', () => {
      expect(parseOpacityToken('0.0')).toBe('0.0');
      expect(parseOpacityToken('1.0')).toBe('1.0');
      expect(parseOpacityToken('.5')).toBe('.5');
      expect(parseOpacityToken('0.')).toBe('0.');
    });
  });

  describe('getStrokeDefaults', () => {
    it('should return null for all properties when no stroke props are set', () => {
      const result = getStrokeDefaults({});
      expect(result).toEqual({
        strokeColor: null,
        strokeWeight: null,
        strokeStyle: null,
      });
    });

    it('should return null when all stroke props are explicitly null', () => {
      const result = getStrokeDefaults({
        strokeColor: null,
        strokeWeight: null,
        strokeStyle: null,
      });
      expect(result).toEqual({
        strokeColor: null,
        strokeWeight: null,
        strokeStyle: null,
      });
    });

    it('should provide defaults when only strokeColor is set', () => {
      const result = getStrokeDefaults({
        strokeColor: 'red',
      });
      expect(result).toEqual({
        strokeColor: 'red',
        strokeWeight: '1px',
        strokeStyle: 'solid',
      });
    });

    it('should provide defaults when only strokeWeight is set', () => {
      const result = getStrokeDefaults({
        strokeWeight: '2px',
      });
      expect(result).toEqual({
        strokeColor: '$border',
        strokeWeight: '2px',
        strokeStyle: 'solid',
      });
    });

    it('should provide defaults when only strokeStyle is set', () => {
      const result = getStrokeDefaults({
        strokeStyle: 'dashed',
      });
      expect(result).toEqual({
        strokeColor: '$border',
        strokeWeight: '1px',
        strokeStyle: 'dashed',
      });
    });

    it('should use provided values when multiple stroke props are set', () => {
      const result = getStrokeDefaults({
        strokeColor: 'blue',
        strokeWeight: '3px',
        strokeStyle: 'dotted',
      });
      expect(result).toEqual({
        strokeColor: 'blue',
        strokeWeight: '3px',
        strokeStyle: 'dotted',
      });
    });

    it('should use partial provided values with defaults for missing ones', () => {
      const result = getStrokeDefaults({
        strokeColor: '$primary',
        strokeStyle: 'dashed',
      });
      expect(result).toEqual({
        strokeColor: '$primary',
        strokeWeight: '1px',
        strokeStyle: 'dashed',
      });
    });

    it('should handle undefined values correctly', () => {
      const result1 = getStrokeDefaults({
        strokeColor: undefined,
        strokeWeight: undefined,
        strokeStyle: undefined,
      });
      expect(result1).toEqual({
        strokeColor: null,
        strokeWeight: null,
        strokeStyle: null,
      });

      const result2 = getStrokeDefaults({
        strokeColor: undefined,
        strokeWeight: '2px',
      });
      expect(result2).toEqual({
        strokeColor: '$border',
        strokeWeight: '2px',
        strokeStyle: 'solid',
      });
    });

    it('should handle mixed null and undefined values', () => {
      const result = getStrokeDefaults({
        strokeColor: null,
        strokeWeight: '2px',
        strokeStyle: undefined,
      });
      expect(result).toEqual({
        strokeColor: '$border',
        strokeWeight: '2px',
        strokeStyle: 'solid',
      });
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle non-string inputs gracefully', () => {
      expect(parseToken(123 as any)).toBeNull();
      expect(parseToken({} as any)).toBeNull();
      expect(parseToken([] as any)).toBeNull();
    });

    it('should handle very long strings', () => {
      const longToken = '$' + 'a'.repeat(1000);
      expect(() => parseToken(longToken)).not.toThrow();
      expect(parseToken(longToken)).toBe('var(--' + 'a'.repeat(1000) + ')');
    });

    it('should handle special characters in token names', () => {
      expect(parseToken('$token-with-dashes')).toBe('var(--token-with-dashes)');
      expect(parseToken('$token_with_underscores')).toBe('var(--token_with_underscores)');
      expect(parseToken('$token123')).toBe('var(--token123)');
    });
  });
});