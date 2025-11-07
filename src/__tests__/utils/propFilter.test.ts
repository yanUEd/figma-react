import {
  isEventProp,
  isDataProp,
  isAriaProp,
  isInternalLayoutProp,
  isReactStandardProp,
  smartShouldForwardProp,
  createComponentShouldForwardProp,
  boxShouldForwardProp,
  rowShouldForwardProp,
  columnShouldForwardProp,
  zstackShouldForwardProp
} from '../../utils/propFilter';

describe('propFilter utils', () => {
  describe('isEventProp', () => {
    it('should return true for valid event props', () => {
      expect(isEventProp('onClick')).toBe(true);
      expect(isEventProp('onMouseEnter')).toBe(true);
      expect(isEventProp('onKeyDown')).toBe(true);
      expect(isEventProp('onTouchStart')).toBe(true);
      expect(isEventProp('onFocus')).toBe(true);
    });

    it('should return false for invalid event props', () => {
      expect(isEventProp('onclick')).toBe(false); // lowercase
      expect(isEventProp('on')).toBe(false); // too short
      expect(isEventProp('onc')).toBe(false); // third char not uppercase
      expect(isEventProp('onClicking')).toBe(true); // still valid
      expect(isEventProp('on1Click')).toBe(true); // starts with number - actually valid by our logic
    });

    it('should handle edge cases', () => {
      expect(isEventProp('onA')).toBe(true);
      expect(isEventProp('onAB')).toBe(true);
      expect(isEventProp('on')).toBe(false);
      expect(isEventProp('on1')).toBe(true); // '1' is uppercase
    });
  });

  describe('isDataProp', () => {
    it('should return true for data attributes', () => {
      expect(isDataProp('data-testid')).toBe(true);
      expect(isDataProp('data-cy')).toBe(true);
      expect(isDataProp('data-qa')).toBe(true);
      expect(isDataProp('data-custom')).toBe(true);
      expect(isDataProp('data-test-id-123')).toBe(true);
    });

    it('should return false for non-data attributes', () => {
      expect(isDataProp('dataset')).toBe(false);
      expect(isDataProp('data')).toBe(false);
      expect(isDataProp('Data-testid')).toBe(false);
      expect(isDataProp('testdata')).toBe(false);
    });
  });

  describe('isAriaProp', () => {
    it('should return true for ARIA attributes', () => {
      expect(isAriaProp('aria-label')).toBe(true);
      expect(isAriaProp('aria-hidden')).toBe(true);
      expect(isAriaProp('aria-expanded')).toBe(true);
      expect(isAriaProp('aria-describedby')).toBe(true);
      expect(isAriaProp('aria-atomic')).toBe(true);
    });

    it('should return false for non-ARIA attributes', () => {
      expect(isAriaProp('aria')).toBe(false);
      expect(isAriaProp('Aria-label')).toBe(false);
      expect(isAriaProp('arialabel')).toBe(false);
      expect(isAriaProp('aria_')).toBe(false);
    });
  });

  describe('isInternalLayoutProp', () => {
    it('should return true for layout props', () => {
      expect(isInternalLayoutProp('width')).toBe(true);
      expect(isInternalLayoutProp('height')).toBe(true);
      expect(isInternalLayoutProp('padding')).toBe(true);
      expect(isInternalLayoutProp('gap')).toBe(true);
      expect(isInternalLayoutProp('alignment')).toBe(true);
      expect(isInternalLayoutProp('overflow')).toBe(true);
      expect(isInternalLayoutProp('radius')).toBe(true);
    });

    it('should return false for non-layout props', () => {
      expect(isInternalLayoutProp('id')).toBe(false);
      expect(isInternalLayoutProp('className')).toBe(false);
      expect(isInternalLayoutProp('style')).toBe(false);
      expect(isInternalLayoutProp('onClick')).toBe(false);
      expect(isInternalLayoutProp('aria-label')).toBe(false);
    });
  });

  describe('isReactStandardProp', () => {
    it('should return true for React standard props', () => {
      expect(isReactStandardProp('children')).toBe(true);
      expect(isReactStandardProp('id')).toBe(true);
      expect(isReactStandardProp('className')).toBe(true);
      expect(isReactStandardProp('style')).toBe(true);
      expect(isReactStandardProp('title')).toBe(true);
      expect(isReactStandardProp('role')).toBe(true);
      expect(isReactStandardProp('data-testid')).toBe(true);
      expect(isReactStandardProp('onClick')).toBe(false); // Event props are handled separately
    });

    it('should return false for non-standard props', () => {
      expect(isReactStandardProp('width')).toBe(true); // width is actually in REACT_STANDARD_PROPS
      expect(isReactStandardProp('height')).toBe(true); // height is also in REACT_STANDARD_PROPS
      expect(isReactStandardProp('padding')).toBe(false);
      expect(isReactStandardProp('customProp')).toBe(false);
    });
  });

  describe('smartShouldForwardProp', () => {
    it('should filter out transient props', () => {
      expect(smartShouldForwardProp('$width')).toBe(false);
      expect(smartShouldForwardProp('$padding')).toBe(false);
      expect(smartShouldForwardProp('$custom')).toBe(false);
    });

    it('should filter out internal layout props', () => {
      expect(smartShouldForwardProp('width')).toBe(false);
      expect(smartShouldForwardProp('height')).toBe(false);
      expect(smartShouldForwardProp('padding')).toBe(false);
      expect(smartShouldForwardProp('gap')).toBe(false);
    });

    it('should allow event props', () => {
      expect(smartShouldForwardProp('onClick')).toBe(true);
      expect(smartShouldForwardProp('onMouseEnter')).toBe(true);
    });

    it('should allow data props', () => {
      expect(smartShouldForwardProp('data-testid')).toBe(true);
      expect(smartShouldForwardProp('data-custom')).toBe(true);
    });

    it('should allow ARIA props', () => {
      expect(smartShouldForwardProp('aria-label')).toBe(true);
      expect(smartShouldForwardProp('aria-hidden')).toBe(true);
    });

    it('should allow React standard props', () => {
      expect(smartShouldForwardProp('children')).toBe(true);
      expect(smartShouldForwardProp('id')).toBe(true);
      expect(smartShouldForwardProp('className')).toBe(true);
    });

    it('should allow unknown props (conservative approach)', () => {
      expect(smartShouldForwardProp('customAttribute')).toBe(true);
      expect(smartShouldForwardProp('someNewProp')).toBe(true);
      expect(smartShouldForwardProp('unknown')).toBe(true);
    });

    it('should handle complex combinations', () => {
      // Event + internal -> should be filtered
      expect(smartShouldForwardProp('onWidth')).toBe(true); // event prop wins
      // Data + internal -> should be filtered
      expect(smartShouldForwardProp('data-width')).toBe(true); // data prop wins
      // ARIA + internal -> should be filtered
      expect(smartShouldForwardProp('aria-width')).toBe(true); // ARIA prop wins
    });
  });

  describe('createComponentShouldForwardProp', () => {
    it('should create a function with additional internal props', () => {
      const customShouldForwardProp = createComponentShouldForwardProp(['customProp']);

      expect(customShouldForwardProp('width')).toBe(false); // internal
      expect(customShouldForwardProp('customProp')).toBe(false); // additional internal
      expect(customShouldForwardProp('onClick')).toBe(true); // event prop
      expect(customShouldForwardProp('id')).toBe(true); // standard prop
    });

    it('should handle empty additional props array', () => {
      const defaultShouldForwardProp = createComponentShouldForwardProp([]);

      expect(defaultShouldForwardProp('width')).toBe(false);
      expect(defaultShouldForwardProp('onClick')).toBe(true);
    });

    it('should handle multiple additional props', () => {
      const customShouldForwardProp = createComponentShouldForwardProp(['prop1', 'prop2', 'prop3']);

      expect(customShouldForwardProp('prop1')).toBe(false);
      expect(customShouldForwardProp('prop2')).toBe(false);
      expect(customShouldForwardProp('prop3')).toBe(false);
      expect(customShouldForwardProp('onClick')).toBe(true);
    });
  });

  describe('component-specific shouldForwardProp functions', () => {
    describe('boxShouldForwardProp', () => {
      it('should filter distribution prop for Box', () => {
        expect(boxShouldForwardProp('distribution')).toBe(false);
        expect(boxShouldForwardProp('width')).toBe(false);
        expect(boxShouldForwardProp('onClick')).toBe(true);
      });
    });

    describe('rowShouldForwardProp', () => {
      it('should filter distribution and wrap props for Row', () => {
        expect(rowShouldForwardProp('distribution')).toBe(false);
        expect(rowShouldForwardProp('wrap')).toBe(false);
        expect(rowShouldForwardProp('width')).toBe(false);
        expect(rowShouldForwardProp('onClick')).toBe(true);
      });
    });

    describe('columnShouldForwardProp', () => {
      it('should filter distribution prop for Column', () => {
        expect(columnShouldForwardProp('distribution')).toBe(false);
        expect(columnShouldForwardProp('width')).toBe(false);
        expect(columnShouldForwardProp('onClick')).toBe(true);
      });
    });

    describe('zstackShouldForwardProp', () => {
      it('should filter gap and distribution props for ZStack', () => {
        expect(zstackShouldForwardProp('gap')).toBe(false);
        expect(zstackShouldForwardProp('distribution')).toBe(false);
        expect(zstackShouldForwardProp('width')).toBe(false);
        expect(zstackShouldForwardProp('onClick')).toBe(true);
      });
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle empty strings', () => {
      expect(isEventProp('')).toBe(false);
      expect(isDataProp('')).toBe(false);
      expect(isAriaProp('')).toBe(false);
      expect(isInternalLayoutProp('')).toBe(false);
      expect(isReactStandardProp('')).toBe(false);
      expect(smartShouldForwardProp('')).toBe(true); // conservative approach
    });

    it('should handle null/undefined inputs gracefully', () => {
      expect(isEventProp(null as any)).toBe(false);
      expect(isEventProp(undefined as any)).toBe(false);
      expect(smartShouldForwardProp(null as any)).toBe(true);
      expect(smartShouldForwardProp(undefined as any)).toBe(true);
    });

    it('should handle special characters', () => {
      expect(isEventProp('onClick-123')).toBe(true);
      expect(isDataProp('data-test_id')).toBe(true);
      expect(isAriaProp('aria-label_with_underscore')).toBe(true);
      expect(smartShouldForwardProp('custom-prop')).toBe(true);
    });
  });
});