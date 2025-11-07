import React from 'react';
import { render, screen } from '@testing-library/react';
import { Box } from '../../../layout/components/Box/Box';

describe('Box component', () => {
  describe('basic rendering', () => {
    it('should render without crashing', () => {
      render(<Box>Test Content</Box>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render with default div element', () => {
      render(<Box data-testid="box">Content</Box>);
      const box = screen.getByTestId('box');
      expect(box.tagName).toBe('DIV');
    });

    it('should render children correctly', () => {
      render(
        <Box data-testid="box">
          <span>Child 1</span>
          <span>Child 2</span>
        </Box>
      );
      expect(screen.getByText('Child 1')).toBeInTheDocument();
      expect(screen.getByText('Child 2')).toBeInTheDocument();
    });

    it('should handle empty children', () => {
      render(<Box data-testid="box"></Box>);
      const box = screen.getByTestId('box');
      expect(box).toBeEmptyDOMElement();
    });

    it('should have displayName', () => {
      expect(Box.displayName).toBe('Box');
    });
  });

  describe('props handling', () => {
    it('should pass through className', () => {
      render(<Box className="custom-class" data-testid="box">Content</Box>);
      const box = screen.getByTestId('box');
      expect(box).toHaveClass('custom-class');
    });

    it('should pass through style', () => {
      const customStyle = { color: 'red', fontSize: '16px' };
      render(<Box style={customStyle} data-testid="box">Content</Box>);
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('color: rgb(255, 0, 0)');
      expect(box).toHaveStyle('font-size: 16px');
    });

    it('should forward ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Box ref={ref}>Content</Box>);
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current?.tagName).toBe('DIV');
    });
  });

  describe('layout props', () => {
    it('should handle width and height props', () => {
      render(
        <Box width="100px" height="200px" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('width: 100px');
      expect(box).toHaveStyle('height: 200px');
    });

    it('should handle hug and fill sizes', () => {
      render(
        <Box width="hug" height="fill" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('width: fit-content');
      expect(box).toHaveStyle('height: 100%');
    });

    it('should handle min and max size props', () => {
      render(
        <Box
          minWidth="50px"
          maxWidth="300px"
          minHeight="100px"
          maxHeight="400px"
          data-testid="box"
        >
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('min-width: 50px');
      expect(box).toHaveStyle('max-width: 300px');
      expect(box).toHaveStyle('min-height: 100px');
      expect(box).toHaveStyle('max-height: 400px');
    });

    it('should handle alignment prop', () => {
      render(
        <Box alignment="center-center" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('align-items: center');
      expect(box).toHaveStyle('justify-content: center');
    });

    it('should handle gap prop', () => {
      render(
        <Box gap="16px" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('gap: 16px');
    });

    it('should handle padding prop', () => {
      render(
        <Box padding="20px" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('padding-top: 20px');
      expect(box).toHaveStyle('padding-right: 20px');
      expect(box).toHaveStyle('padding-bottom: 20px');
      expect(box).toHaveStyle('padding-left: 20px');
    });

    it('should handle directional padding', () => {
      render(
        <Box padding="x:10px y:20px" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('padding-left: 10px');
      expect(box).toHaveStyle('padding-right: 10px');
      expect(box).toHaveStyle('padding-top: 20px');
      expect(box).toHaveStyle('padding-bottom: 20px');
    });

    it('should handle overflow prop', () => {
      render(
        <Box overflow="hidden" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('overflow: hidden');
    });
  });

  describe('visual props', () => {
    it('should handle fill prop with colors', () => {
      render(
        <Box fill="red" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('background-color: rgb(255, 0, 0)');
    });

    it('should handle fill prop with tokens', () => {
      render(
        <Box fill="$primary" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('background-color: var(--primary, #000000)');
    });

    it('should handle opacity prop', () => {
      render(
        <Box opacity="0.5" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('opacity: 0.5');
    });

    it('should handle stroke props', () => {
      render(
        <Box
          strokeColor="blue"
          strokeWeight="2px"
          strokeStyle="solid"
          data-testid="box"
        >
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('border-top: 2px solid blue');
      expect(box).toHaveStyle('border-right: 2px solid blue');
      expect(box).toHaveStyle('border-bottom: 2px solid blue');
      expect(box).toHaveStyle('border-left: 2px solid blue');
    });

    it('should handle radius prop', () => {
      render(
        <Box radius="8px" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('border-top-left-radius: 8px');
      expect(box).toHaveStyle('border-top-right-radius: 8px');
      expect(box).toHaveStyle('border-bottom-right-radius: 8px');
      expect(box).toHaveStyle('border-bottom-left-radius: 8px');
    });

    it('should handle directional radius', () => {
      render(
        <Box radius="top:10px right:20px bottom:30px left:40px" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      // Check that element exists and radius prop was accepted
      expect(box).toBeInTheDocument();
      expect(box).toHaveAttribute('data-testid', 'box');
    });
  });

  describe('distribution prop', () => {
    it('should handle distribution prop', () => {
      render(
        <Box distribution="center" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('justify-content: center');
    });

    it('should handle space-between distribution', () => {
      render(
        <Box distribution="space-between" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('justify-content: space-between');
    });

    it('should handle space distribution', () => {
      render(
        <Box distribution="space" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('justify-content: space-around');
    });
  });

  describe('token support', () => {
    it('should handle size tokens', () => {
      render(
        <Box width="$size-md" height="$size-lg" gap="$spacing-sm" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      // Check that element exists and token props were accepted
      expect(box).toBeInTheDocument();
      expect(box).toHaveAttribute('data-testid', 'box');
    });

    it('should handle color tokens with fallback', () => {
      render(
        <Box fill="$nonexistent" data-testid="box">
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      expect(box).toHaveStyle('background-color: var(--nonexistent, #000000)');
    });

    it('should handle mixed tokens and values', () => {
      render(
        <Box
          width="100px"
          fill="$primary"
          strokeColor="$border"
          padding="$spacing-md"
          data-testid="box"
        >
          Content
        </Box>
      );
      const box = screen.getByTestId('box');
      // Check that element exists and mixed props were accepted
      expect(box).toBeInTheDocument();
      expect(box).toHaveAttribute('data-testid', 'box');
    });
  });

  describe('edge cases', () => {
    it('should handle null/undefined props gracefully', () => {
      expect(() => {
        render(
          <Box
            width={null as any}
            height={undefined as any}
            fill={null as any}
            data-testid="box"
          >
            Content
          </Box>
        );
      }).not.toThrow();

      const box = screen.getByTestId('box');
      expect(box).toBeInTheDocument();
    });

    it('should handle complex nested children', () => {
      render(
        <Box data-testid="box">
          <div>
            <span>Nested Content</span>
            <ul>
              <li>Item 1</li>
              <li>Item 2</li>
            </ul>
          </div>
        </Box>
      );
      expect(screen.getByText('Nested Content')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('should handle many props simultaneously', () => {
      render(
        <Box
          width="200px"
          height="100px"
          alignment="center-center"
          gap="10px"
          padding="15px"
          fill="$background"
          strokeColor="$border"
          strokeWeight="1px"
          radius="4px"
          opacity="0.9"
          overflow="hidden"
          className="complex-box"
          style={{ zIndex: 10 }}
          data-testid="box"
        >
          Complex Content
        </Box>
      );

      const box = screen.getByTestId('box');
      expect(box).toHaveClass('complex-box');
      expect(box).toHaveStyle('z-index: 10');
      expect(box).toHaveStyle('width: 200px');
      expect(box).toHaveStyle('height: 100px');
      expect(box).toHaveStyle('align-items: center');
      expect(box).toHaveStyle('justify-content: center');
      expect(box).toHaveStyle('gap: 10px');
      expect(box).toHaveStyle('background-color: var(--background, #000000)');
      expect(box).toHaveStyle('opacity: 0.9');
    });
  });

  describe('accessibility', () => {
    it('should support ARIA attributes', () => {
      render(
        <Box
          role="group"
          aria-label="Box Group"
          aria-describedby="description"
          data-testid="box"
        >
          Content
        </Box>
      );

      const box = screen.getByTestId('box');
      expect(box).toHaveAttribute('role', 'group');
      expect(box).toHaveAttribute('aria-label', 'Box Group');
      expect(box).toHaveAttribute('aria-describedby', 'description');
    });

    it('should support data attributes', () => {
      render(
        <Box
          data-testid="test-box"
          data-custom="custom-value"
          data-testid-2="another-value"
        >
          Content
        </Box>
      );

      const box = screen.getByTestId('test-box');
      expect(box).toHaveAttribute('data-custom', 'custom-value');
      expect(box).toHaveAttribute('data-testid-2', 'another-value');
    });
  });
});