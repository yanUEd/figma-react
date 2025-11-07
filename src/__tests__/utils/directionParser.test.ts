import {
  parseDirection,
  generatePaddingCSS,
  generateBorderCSS,
  generateBorderRadiusCSS,
  getDirectionalValue
} from '../../layout/utils/directionParser';

describe('directionParser utils', () => {
  describe('parseDirection', () => {
    it('should return empty object for empty input', () => {
      expect(parseDirection('')).toEqual({});
      expect(parseDirection(null as any)).toEqual({});
      expect(parseDirection(undefined as any)).toEqual({});
    });

    it('should parse simple values without colons as x/y directions', () => {
      const result = parseDirection('10px');
      expect(result).toEqual({
        x: '10px',
        y: '10px'
      });
    });

    it('should parse token values', () => {
      const result = parseDirection('$lg');
      expect(result).toEqual({
        x: '$lg',
        y: '$lg'
      });
    });

    it('should parse directional syntax with colons', () => {
      const result = parseDirection('x:10px y:20px');
      expect(result).toEqual({
        x: '10px',
        y: '20px'
      });
    });

    it('should parse complex directional syntax', () => {
      const result = parseDirection('top:$primary right:$secondary bottom:$primary left:$secondary');
      expect(result).toEqual({
        top: '$primary',
        right: '$secondary',
        bottom: '$primary',
        left: '$secondary'
      });
    });

    it('should handle mixed directional syntax', () => {
      const result = parseDirection('x:5px top:10px');
      expect(result).toEqual({
        x: '5px',
        top: '10px'
      });
    });

    it('should handle whitespace variations', () => {
      const result1 = parseDirection('x:10px  y:20px');
      const result2 = parseDirection('x:10px y:20px');
      const result3 = parseDirection('  x:10px y:20px  ');

      expect(result1).toEqual(result2);
      expect(result2).toEqual(result3);
      expect(result1).toEqual({
        x: '10px',
        y: '20px'
      });
    });

    it('should ignore malformed parts', () => {
      const result = parseDirection('x:10px invalidPart y:20px');
      expect(result).toEqual({
        x: '10px',
        y: '20px'
      });
    });

    it('should handle empty values', () => {
      const result = parseDirection('x: y:20px');
      expect(result).toEqual({
        y: '20px'
      });
    });
  });

  describe('generatePaddingCSS', () => {
    it('should generate CSS for simple values', () => {
      const css = generatePaddingCSS('10px');
      expect(css).toBe('padding-left: 10px; padding-right: 10px; padding-top: 10px; padding-bottom: 10px;');
    });

    it('should generate CSS for x/y directions', () => {
      const css = generatePaddingCSS('x:10px y:20px');
      expect(css).toBe(
        'padding-left: 10px; padding-right: 10px; padding-top: 20px; padding-bottom: 20px;'
      );
    });

    it('should prioritize specific directions over x/y', () => {
      const css = generatePaddingCSS('x:10px y:20px top:5px right:15px');
      expect(css).toBe(
        'padding-left: 10px; padding-right: 10px; padding-top: 20px; padding-bottom: 20px; ' +
        'padding-top: 5px; padding-right: 15px;'
      );
    });

    it('should handle complex directional padding', () => {
      const css = generatePaddingCSS('top:10px right:20px bottom:30px left:40px');
      expect(css).toBe(
        'padding-top: 10px; padding-right: 20px; padding-bottom: 30px; padding-left: 40px;'
      );
    });

    it('should handle token values', () => {
      const css = generatePaddingCSS('$lg');
      expect(css).toContain('padding-left: $lg;');
      expect(css).toContain('padding-right: $lg;');
      expect(css).toContain('padding-top: $lg;');
      expect(css).toContain('padding-bottom: $lg;');
    });

    it('should handle empty input', () => {
      const css = generatePaddingCSS('');
      expect(css).toBe('');
    });
  });

  describe('generateBorderCSS', () => {
    it('should generate simple border CSS', () => {
      const css = generateBorderCSS('red', '1px', 'solid');
      expect(css).toBe('border: 1px solid red;');
    });

    it('should generate directional border CSS with color directions', () => {
      const colorParsed = { top: 'red', right: 'blue', bottom: 'green', left: 'yellow' };
      const css = generateBorderCSS('red', '1px', 'solid', colorParsed);
      expect(css).toBe(
        'border-top: 1px solid red; ' +
        'border-right: 1px solid blue; ' +
        'border-bottom: 1px solid green; ' +
        'border-left: 1px solid yellow;'
      );
    });

    it('should handle mixed directional properties', () => {
      const colorParsed = { top: 'red', bottom: 'blue' };
      const weightParsed = { left: '2px', right: '3px' };
      const css = generateBorderCSS('black', '1px', 'solid', colorParsed, weightParsed);
      expect(css).toBe(
        'border-top: 1px solid red; ' +
        'border-right: 3px solid black; ' +
        'border-bottom: 1px solid blue; ' +
        'border-left: 2px solid black;'
      );
    });

    it('should use fallback values for missing directional properties', () => {
      const colorParsed = { top: 'red' };
      const css = generateBorderCSS('black', '1px', 'solid', colorParsed);
      expect(css).toBe(
        'border-top: 1px solid red; ' +
        'border-right: 1px solid black; ' +
        'border-bottom: 1px solid black; ' +
        'border-left: 1px solid black;'
      );
    });

    it('should handle all three directional properties', () => {
      const colorParsed = { top: 'red', right: 'blue' };
      const weightParsed = { top: '2px', right: '3px' };
      const styleParsed = { top: 'dashed', right: 'dotted' };
      const css = generateBorderCSS('black', '1px', 'solid', colorParsed, weightParsed, styleParsed);
      expect(css).toBe(
        'border-top: 2px dashed red; ' +
        'border-right: 3px dotted blue; ' +
        'border-bottom: 1px solid black; ' +
        'border-left: 1px solid black;'
      );
    });

    it('should handle empty directional objects', () => {
      const css = generateBorderCSS('red', '1px', 'solid', {}, {}, {});
      expect(css).toBe('border: 1px solid red;');
    });
  });

  describe('generateBorderRadiusCSS', () => {
    it('should generate simple border-radius CSS', () => {
      const css = generateBorderRadiusCSS('5px');
      expect(css).toBe('border-radius: 5px;');
    });

    it('should generate directional border-radius CSS', () => {
      const radiusParsed = {
        'top-left': '10px',
        'top-right': '20px',
        'bottom-right': '30px',
        'bottom-left': '40px'
      };
      const css = generateBorderRadiusCSS('5px', radiusParsed);
      expect(css).toBe(
        'border-top-left-radius: 10px; ' +
        'border-top-right-radius: 20px; ' +
        'border-bottom-right-radius: 30px; ' +
        'border-bottom-left-radius: 40px;'
      );
    });

    it('should handle partial corner specifications with auto-zero', () => {
      const radiusParsed = { 'top-left': '10px' };
      const css = generateBorderRadiusCSS('5px', radiusParsed);
      expect(css).toContain('border-top-left-radius: 10px;');
      expect(css).toContain('border-top-right-radius: 0;');
      // bottom corners remain at default since not explicitly set
      expect(css).toContain('border-bottom-right-radius: 5px;');
      expect(css).toContain('border-bottom-left-radius: 5px;');
    });

    it('should handle empty radiusParsed', () => {
      const css = generateBorderRadiusCSS('5px', {});
      expect(css).toBe('border-radius: 5px;');
    });

    it('should handle undefined radiusParsed', () => {
      const css = generateBorderRadiusCSS('5px', undefined);
      expect(css).toBe('border-radius: 5px;');
    });

    it('should handle mixed corner specifications', () => {
      const radiusParsed = {
        'top-left': '10px',
        'bottom-right': '20px'
      };
      const css = generateBorderRadiusCSS('5px', radiusParsed);
      expect(css).toContain('border-top-left-radius: 10px;');
      expect(css).toContain('border-bottom-right-radius: 20px;');
    });
  });

  describe('getDirectionalValue', () => {
    it('should return null for undefined parsed', () => {
      const result = getDirectionalValue('10px', 'top', undefined);
      expect(result).toBeNull();
    });

    it('should return null for null parsed', () => {
      const result = getDirectionalValue('10px', 'top', null as any);
      expect(result).toBeNull();
    });

    it('should return null for non-existent direction', () => {
      const parsed = { top: '10px', right: '20px' };
      const result = getDirectionalValue('5px', 'bottom', parsed);
      expect(result).toBeNull();
    });

    it('should return directional value if it exists', () => {
      const parsed = { top: '10px', right: '20px' };
      const result = getDirectionalValue('5px', 'top', parsed);
      expect(result).toBe('10px');
    });

    it('should work with all valid directions', () => {
      const parsed = {
        top: '1px',
        right: '2px',
        bottom: '3px',
        left: '4px',
        x: '5px',
        y: '6px',
        'top-left': '7px'
      };

      expect(getDirectionalValue('0px', 'top', parsed)).toBe('1px');
      expect(getDirectionalValue('0px', 'right', parsed)).toBe('2px');
      expect(getDirectionalValue('0px', 'bottom', parsed)).toBe('3px');
      expect(getDirectionalValue('0px', 'left', parsed)).toBe('4px');
      expect(getDirectionalValue('0px', 'x', parsed)).toBe('5px');
      expect(getDirectionalValue('0px', 'y', parsed)).toBe('6px');
      expect(getDirectionalValue('0px', 'top-left', parsed)).toBe('7px');
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle malformed inputs gracefully', () => {
      expect(parseDirection(':')).toEqual({});
      expect(parseDirection('x:')).toEqual({});
      expect(parseDirection(':value')).toEqual({});
    });

    it('should handle non-string inputs', () => {
      expect(parseDirection(123 as any)).toEqual({});
      expect(parseDirection({} as any)).toEqual({});
    });

    it('should handle very long strings', () => {
      const longInput = 'x:' + 'a'.repeat(1000);
      expect(() => parseDirection(longInput)).not.toThrow();
    });
  });
});