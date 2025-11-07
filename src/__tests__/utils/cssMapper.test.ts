import {
  mapAlignment,
  getDefaultAlignment,
  mapDistribution,
  mapSize,
  mapOverflow,
  generateCSSConfig,
  getFlexDirection,
  generateCSSString,
  generateCompleteCSS
} from '../../layout/utils/cssMapper';

describe('cssMapper utils', () => {
  describe('mapAlignment', () => {
    describe('for box/row containers', () => {
      it('should map top-left correctly', () => {
        expect(mapAlignment('top-left', 'box')).toEqual({
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        });
        expect(mapAlignment('top-left', 'row')).toEqual({
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        });
      });

      it('should map center-center correctly', () => {
        expect(mapAlignment('center-center', 'box')).toEqual({
          alignItems: 'center',
          justifyContent: 'center'
        });
      });

      it('should map bottom-right correctly', () => {
        expect(mapAlignment('bottom-right', 'box')).toEqual({
          alignItems: 'flex-end',
          justifyContent: 'flex-end'
        });
      });

      it('should handle all alignment positions', () => {
        const alignments = [
          'top-left', 'top-center', 'top-right',
          'center-left', 'center-center', 'center-right',
          'bottom-left', 'bottom-center', 'bottom-right'
        ] as const;

        alignments.forEach(alignment => {
          const result = mapAlignment(alignment, 'box');
          expect(result).toHaveProperty('alignItems');
          expect(result).toHaveProperty('justifyContent');
          expect(typeof result.alignItems).toBe('string');
          expect(typeof result.justifyContent).toBe('string');
        });
      });
    });

    describe('for column containers', () => {
      it('should swap alignItems and justifyContent', () => {
        const boxResult = mapAlignment('top-left', 'box');
        const columnResult = mapAlignment('top-left', 'column');

        // For column, alignItems and justifyContent should be swapped compared to box
        expect(columnResult.alignItems).toBe(boxResult.justifyContent);
        expect(columnResult.justifyContent).toBe(boxResult.alignItems);
      });

      it('should map center-center correctly for column', () => {
        expect(mapAlignment('center-center', 'column')).toEqual({
          alignItems: 'center',
          justifyContent: 'center'
        });
      });
    });

    describe('for zstack containers', () => {
      it('should return alignment mapping', () => {
        const result = mapAlignment('center-center', 'zstack');
        expect(result).toEqual({
          alignItems: 'center',
          justifyContent: 'center'
        });
      });

      it('should default to center-center for invalid alignment', () => {
        const result = mapAlignment('invalid' as any, 'zstack');
        expect(result).toEqual({
          alignItems: 'center',
          justifyContent: 'center'
        });
      });
    });

    it('should handle invalid alignment values', () => {
      const result = mapAlignment('invalid' as any, 'box');
      expect(result).toEqual({
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      });
    });
  });

  describe('getDefaultAlignment', () => {
    it('should return correct default alignment for each container type', () => {
      const validAlignments = ['top-left', 'top-center', 'top-right', 'center-left', 'center-center', 'center-right', 'bottom-left', 'bottom-center', 'bottom-right'];
      expect(validAlignments).toContain(getDefaultAlignment('box'));
      expect(validAlignments).toContain(getDefaultAlignment('column'));
      expect(validAlignments).toContain(getDefaultAlignment('row'));
      expect(validAlignments).toContain(getDefaultAlignment('zstack'));
    });

    it('should return top-left for unknown container type', () => {
      expect(getDefaultAlignment('unknown' as any)).toBe('top-left');
    });
  });

  describe('mapDistribution', () => {
    it('should map distribution values correctly', () => {
      expect(mapDistribution('pack')).toBe('flex-start');
      expect(mapDistribution('center')).toBe('center');
      expect(mapDistribution('space')).toBe('space-around');
      expect(mapDistribution('space-between')).toBe('space-between');
    });

    it('should default to flex-start for invalid distribution', () => {
      expect(mapDistribution('invalid' as any)).toBe('flex-start');
    });
  });

  describe('mapSize', () => {
    it('should map hug to fit-content', () => {
      expect(mapSize('hug')).toBe('fit-content');
    });

    it('should map fill to 100%', () => {
      expect(mapSize('fill')).toBe('100%');
    });

    it('should return original size for other values', () => {
      expect(mapSize('100px')).toBe('100px');
      expect(mapSize('50%')).toBe('50%');
      expect(mapSize('auto')).toBe('auto');
    });

    it('should handle undefined', () => {
      expect(mapSize(undefined)).toBe('fit-content');
    });
  });

  describe('mapOverflow', () => {
    describe('for box/zstack containers', () => {
      it('should return overflow value directly', () => {
        expect(mapOverflow('hidden', 'box')).toBe('hidden');
        expect(mapOverflow('scroll', 'zstack')).toBe('scroll');
      });
    });

    describe('for column containers', () => {
      it('should control vertical overflow', () => {
        expect(mapOverflow('scroll', 'column')).toBe('overflow-x: visible; overflow-y: scroll;');
        expect(mapOverflow('hidden', 'column')).toBe('overflow-x: hidden; overflow-y: hidden;');
        expect(mapOverflow('auto', 'column')).toBe('overflow-x: visible; overflow-y: auto;');
      });
    });

    describe('for row containers', () => {
      it('should control horizontal overflow', () => {
        expect(mapOverflow('scroll', 'row')).toBe('overflow-x: scroll; overflow-y: visible;');
        expect(mapOverflow('hidden', 'row')).toBe('overflow-x: hidden; overflow-y: hidden;');
        expect(mapOverflow('auto', 'row')).toBe('overflow-x: auto; overflow-y: visible;');
      });
    });
  });

  describe('getFlexDirection', () => {
    it('should return correct flex direction for each container type', () => {
      expect(getFlexDirection('box')).toBe('column');
      expect(getFlexDirection('column')).toBe('column');
      expect(getFlexDirection('row')).toBe('row');
      expect(getFlexDirection('zstack')).toBe('column');
    });

    it('should default to column for unknown container type', () => {
      expect(getFlexDirection('unknown' as any)).toBe('column');
    });
  });

  describe('generateCSSConfig', () => {
    it('should generate basic flexbox config for box', () => {
      const config = generateCSSConfig({}, 'box');

      expect(config.display).toBe('flex');
      expect(config.flexDirection).toBe('column');
      expect(config.alignItems).toBeDefined();
      expect(config.justifyContent).toBeDefined();
    });

    it('should generate config with size properties', () => {
      const props = {
        width: '100px',
        height: '200px',
        minWidth: '50px',
        maxWidth: '150px'
      };

      const config = generateCSSConfig(props, 'box');

      expect(config.width).toBe('100px');
      expect(config.height).toBe('200px');
      expect(config.minWidth).toBe('50px');
      expect(config.maxWidth).toBe('150px');
    });

    it('should handle hug and fill sizes', () => {
      const props = {
        width: 'hug',
        height: 'fill'
      };

      const config = generateCSSConfig(props, 'box');

      expect(config.width).toBe('fit-content');
      expect(config.height).toBe('100%');
    });

    it('should include visual properties', () => {
      const props = {
        fill: '$primary',
        opacity: '0.5'
      };

      const config = generateCSSConfig(props, 'box');

      expect(config.backgroundColor).toBe('var(--primary, #000000)');
      expect(config.opacity).toBe('0.5');
    });

    it('should handle zstack special case', () => {
      const config = generateCSSConfig({}, 'zstack');

      expect(config.display).toBeUndefined();
      expect(config.flexDirection).toBeUndefined();
      expect(config.alignItems).toBeUndefined();
      expect(config.justifyContent).toBeUndefined();
    });

    it('should include gap property', () => {
      const props = {
        gap: '$spacing-md'
      };

      const config = generateCSSConfig(props, 'box');

      expect(config.gap).toBe('var(--spacing-md)');
    });

    it('should handle distribution for non-column containers', () => {
      const props = {
        distribution: 'center'
      };

      const boxConfig = generateCSSConfig(props, 'box');
      expect(boxConfig.justifyContent).toBe('center');

      const rowConfig = generateCSSConfig(props, 'row');
      expect(rowConfig.justifyContent).toBe('center');
    });
  });

  describe('generateCSSString', () => {
    it('should convert config to CSS string', () => {
      const config = {
        display: 'flex',
        flexDirection: 'column',
        width: '100px',
        backgroundColor: 'red'
      };

      const cssString = generateCSSString(config);

      expect(cssString).toContain('display: flex;');
      expect(cssString).toContain('flex-direction: column;');
      expect(cssString).toContain('width: 100px;');
      expect(cssString).toContain('background-color: red;');
    });

    it('should handle camelCase to kebab-case conversion', () => {
      const config = {
        backgroundColor: 'blue',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start'
      };

      const cssString = generateCSSString(config);

      expect(cssString).toContain('background-color: blue;');
      expect(cssString).toContain('flex-direction: row;');
      expect(cssString).toContain('justify-content: center;');
      expect(cssString).toContain('align-items: flex-start;');
    });

    it('should ignore undefined values', () => {
      const config = {
        display: 'flex',
        width: undefined,
        height: null as any,
        backgroundColor: 'red'
      };

      const cssString = generateCSSString(config);

      expect(cssString).toContain('display: flex;');
      expect(cssString).toContain('background-color: red;');
      expect(cssString).not.toContain('width:');
      expect(cssString).not.toContain('height:');
    });
  });

  describe('generateCompleteCSS', () => {
    it('should generate complete CSS with padding', () => {
      const props = {
        padding: '10px'
      };

      const css = generateCompleteCSS(props, 'box');

      expect(css).toContain('padding-top: 10px;');
      expect(css).toContain('padding-right: 10px;');
      expect(css).toContain('padding-bottom: 10px;');
      expect(css).toContain('padding-left: 10px;');
    });

    it('should generate complete CSS with directional padding', () => {
      const props = {
        padding: 'x:5px y:10px'
      };

      const css = generateCompleteCSS(props, 'box');

      expect(css).toContain('padding-left: 5px;');
      expect(css).toContain('padding-right: 5px;');
      expect(css).toContain('padding-top: 10px;');
      expect(css).toContain('padding-bottom: 10px;');
    });

    it('should generate complete CSS with border', () => {
      const props = {
        strokeColor: 'red',
        strokeWeight: '2px',
        strokeStyle: 'solid'
      };

      const css = generateCompleteCSS(props, 'box');

      expect(css).toContain('border-top: 2px solid red;');
      expect(css).toContain('border-right: 2px solid red;');
      expect(css).toContain('border-bottom: 2px solid red;');
      expect(css).toContain('border-left: 2px solid red;');
    });

    it('should generate complete CSS with border-radius', () => {
      const props = {
        radius: '5px'
      };

      const css = generateCompleteCSS(props, 'box');

      expect(css).toContain('border-top-left-radius: 5px;');
      expect(css).toContain('border-top-right-radius: 5px;');
      expect(css).toContain('border-bottom-right-radius: 5px;');
      expect(css).toContain('border-bottom-left-radius: 5px;');
    });

    it('should generate complete CSS with overflow', () => {
      const props = {
        overflow: 'hidden'
      };

      const css = generateCompleteCSS(props, 'box');

      expect(css).toContain('overflow: hidden;');
    });

    it('should handle directional overflow for column', () => {
      const props = {
        overflow: 'scroll'
      };

      const css = generateCompleteCSS(props, 'column');

      expect(css).toContain('overflow-x: visible; overflow-y: scroll;');
    });

    it('should combine multiple properties', () => {
      const props = {
        width: '100px',
        height: '50px',
        padding: '10px',
        fill: 'blue',
        overflow: 'hidden'
      };

      const css = generateCompleteCSS(props, 'box');

      expect(css).toContain('width: 100px;');
      expect(css).toContain('height: 50px;');
      expect(css).toContain('background-color: blue;');
      expect(css).toContain('padding-top: 10px;');
      expect(css).toContain('overflow: hidden;');
    });

    it('should filter out empty CSS parts', () => {
      const props = {};

      const css = generateCompleteCSS(props, 'box');

      expect(css).toContain('display: flex;');
      expect(css.trim()).not.toContain('\n\n');
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle null/undefined props', () => {
      const config1 = generateCSSConfig(null as any, 'box');
      const config2 = generateCSSConfig(undefined as any, 'box');
      expect(config1).toBeDefined();
      expect(config2).toBeDefined();
      expect(config1.display).toBe('flex');
      expect(config2.display).toBe('flex');
    });

    it('should handle invalid container types', () => {
      expect(() => mapAlignment('top-left', 'invalid' as any)).not.toThrow();
      expect(() => generateCSSConfig({}, 'invalid' as any)).not.toThrow();
    });

    it('should handle very large objects', () => {
      const largeProps = {
        width: '100px',
        height: '200px',
        padding: '10px',
        fill: 'red',
        strokeColor: 'blue',
        strokeWeight: '1px',
        strokeStyle: 'solid',
        radius: '5px',
        opacity: '0.5',
        gap: '10px',
        alignment: 'center-center',
        distribution: 'center',
        overflow: 'hidden'
      };

      expect(() => generateCompleteCSS(largeProps, 'box')).not.toThrow();
    });
  });
});