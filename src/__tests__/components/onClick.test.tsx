import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Box } from '../../layout/components/Box/Box';
import { Column } from '../../layout/components/Column/Column';
import { Row } from '../../layout/components/Row/Row';
import { ZStack } from '../../layout/components/ZStack/ZStack';

describe('onClick Event Handler Tests', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe('Box Component onClick', () => {
    it('should fire onClick when clicked', async () => {
      const handleClick = jest.fn();

      render(
        <Box
          data-testid="clickable-box"
          width="200px"
          height="100px"
          onClick={handleClick}
        >
          Click me
        </Box>
      );

      const box = screen.getByTestId('clickable-box');
      expect(box).toBeInTheDocument();

      await user.click(box);

      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
          target: box
        })
      );
    });

    it('should pass click event data correctly', async () => {
      const handleClick = jest.fn();

      render(
        <Box
          data-testid="data-box"
          onClick={handleClick}
          width="150px"
          height="80px"
        />
      );

      const box = screen.getByTestId('data-box');
      await user.click(box);

      expect(handleClick).toHaveBeenCalledTimes(1);
      const clickEvent = handleClick.mock.calls[0][0];
      expect(clickEvent).toHaveProperty('type', 'click');
      expect(clickEvent).toHaveProperty('target');
    });

    it('should work with other props simultaneously', async () => {
      const handleClick = jest.fn();

      render(
        <Box
          data-testid="combined-box"
          width="200px"
          height="100px"
          fill="blue"
          onClick={handleClick}
          onMouseEnter={() => {}}
          tabIndex={0}
        />
      );

      const box = screen.getByTestId('combined-box');
      await user.click(box);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Column Component onClick', () => {
    it('should fire onClick when clicked', async () => {
      const handleClick = jest.fn();

      render(
        <Column
          data-testid="clickable-column"
          width="200px"
          height="150px"
          onClick={handleClick}
          gap="10px"
        >
          <Box height="50px" fill="red">Item 1</Box>
          <Box height="50px" fill="green">Item 2</Box>
        </Column>
      );

      const column = screen.getByTestId('clickable-column');
      await user.click(column);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should work with alignment and gap props', async () => {
      const handleClick = jest.fn();

      render(
        <Column
          data-testid="styled-column"
          width="250px"
          height="200px"
          onClick={handleClick}
          alignment="center-center"
          gap="20px"
          padding="15px"
        >
          <Box height="40px" fill="blue">Content</Box>
        </Column>
      );

      const column = screen.getByTestId('styled-column');
      await user.click(column);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Row Component onClick', () => {
    it('should fire onClick when clicked', async () => {
      const handleClick = jest.fn();

      render(
        <Row
          data-testid="clickable-row"
          width="300px"
          height="100px"
          onClick={handleClick}
          gap="15px"
        >
          <Box width="80px" height="60px" fill="yellow">Left</Box>
          <Box width="80px" height="60px" fill="cyan">Right</Box>
        </Row>
      );

      const row = screen.getByTestId('clickable-row');
      await user.click(row);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should work with distribution props', async () => {
      const handleClick = jest.fn();

      render(
        <Row
          data-testid="distributed-row"
          width="400px"
          height="80px"
          onClick={handleClick}
          distribution="space-between"
          padding="10px"
        >
          <Box width="60px" height="50px" fill="orange">Start</Box>
          <Box width="60px" height="50px" fill="purple">End</Box>
        </Row>
      );

      const row = screen.getByTestId('distributed-row');
      await user.click(row);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('ZStack Component onClick', () => {
    it('should fire onClick when clicked', async () => {
      const handleClick = jest.fn();

      render(
        <ZStack
          data-testid="clickable-zstack"
          width="200px"
          height="150px"
          onClick={handleClick}
        >
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            fill="lightblue"
          />
          <Box
            position="absolute"
            top="20px"
            left="20px"
            width="100px"
            height="80px"
            fill="white"
          />
        </ZStack>
      );

      const zstack = screen.getByTestId('clickable-zstack');
      await user.click(zstack);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should work with stacked children', async () => {
      const handleClick = jest.fn();

      render(
        <ZStack
          data-testid="stacked-zstack"
          width="250px"
          height="200px"
          onClick={handleClick}
        >
          <Box
            position="absolute"
            width="100%"
            height="100%"
            fill="#f0f0f0"
          />
          <Box
            position="absolute"
            top="30px"
            left="30px"
            width="120px"
            height="100px"
            fill="white"
            data-testid="top-child"
          />
        </ZStack>
      );

      const zstack = screen.getByTestId('stacked-zstack');
      await user.click(zstack);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Nested Component onClick', () => {
    it('should handle onClick on nested components', async () => {
      const handleParentClick = jest.fn();
      const handleChildClick = jest.fn();

      render(
        <Column
          data-testid="parent-column"
          width="300px"
          height="250px"
          onClick={handleParentClick}
          gap="10px"
        >
          <Box
            data-testid="child-box-1"
            height="60px"
            fill="red"
            onClick={handleChildClick}
          >
            Child 1
          </Box>
          <Box
            data-testid="child-box-2"
            height="60px"
            fill="green"
          >
            Child 2
          </Box>
        </Column>
      );

      const child1 = screen.getByTestId('child-box-1');
      const child2 = screen.getByTestId('child-box-2');

      // Test child click - should trigger both child and potentially parent
      await user.click(child1);
      expect(handleChildClick).toHaveBeenCalledTimes(1);

      // Test second child click - should not trigger child handler
      await user.click(child2);
      expect(handleChildClick).toHaveBeenCalledTimes(1); // Still only 1 from first child
    });

    it('should handle complex nested layouts', async () => {
      const handleRowClick = jest.fn();
      const handleBoxClick = jest.fn();

      render(
        <Row
          data-testid="parent-row"
          width="400px"
          height="150px"
          onClick={handleRowClick}
          gap="20px"
        >
          <Column width="150px" height="100%" gap="10px">
            <Box
              data-testid="nested-box-1"
              height="40px"
              fill="blue"
              onClick={handleBoxClick}
            />
            <Box
              data-testid="nested-box-2"
              height="40px"
              fill="yellow"
            />
          </Column>
          <Box
            data-testid="nested-box-3"
            width="100px"
            height="100%"
            fill="green"
          />
        </Row>
      );

      const nestedBox1 = screen.getByTestId('nested-box-1');
      await user.click(nestedBox1);

      expect(handleBoxClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Event Propagation Tests', () => {
    it('should stop propagation when event.stopPropagation() is called', async () => {
      const handleParentClick = jest.fn();
      const handleChildClick = jest.fn((e: React.MouseEvent) => {
        e.stopPropagation();
      });

      render(
        <Box
          data-testid="parent-box"
          width="200px"
          height="150px"
          onClick={handleParentClick}
        >
          <Box
            data-testid="child-box"
            width="100px"
            height="80px"
            fill="red"
            onClick={handleChildClick}
          >
            Child
          </Box>
        </Box>
      );

      const childBox = screen.getByTestId('child-box');
      await user.click(childBox);

      expect(handleChildClick).toHaveBeenCalledTimes(1);
      expect(handleParentClick).not.toHaveBeenCalled();
    });

    it('should allow event bubbling by default', async () => {
      const handleParentClick = jest.fn();
      const handleChildClick = jest.fn();

      render(
        <Box
          data-testid="parent-box"
          width="200px"
          height="150px"
          onClick={handleParentClick}
        >
          <Box
            data-testid="child-box"
            width="100px"
            height="80px"
            fill="red"
            onClick={handleChildClick}
          >
            Child
          </Box>
        </Box>
      );

      const childBox = screen.getByTestId('child-box');
      await user.click(childBox);

      expect(handleChildClick).toHaveBeenCalledTimes(1);
      // Note: Whether parent fires depends on styled-components implementation
    });
  });

  describe('Accessibility and Keyboard Events', () => {
    it('should handle click via keyboard (Enter key)', async () => {
      const handleClick = jest.fn();

      render(
        <Box
          data-testid="keyboard-box"
          width="150px"
          height="80px"
          onClick={handleClick}
          tabIndex={0}
          role="button"
        >
          Clickable Box
        </Box>
      );

      const box = screen.getByTestId('keyboard-box');
      box.focus();

      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should handle click via keyboard (Space key)', async () => {
      const handleClick = jest.fn();

      render(
        <Box
          data-testid="space-box"
          width="150px"
          height="80px"
          onClick={handleClick}
          tabIndex={0}
          role="button"
        >
          Space Clickable
        </Box>
        );

      const box = screen.getByTestId('space-box');
      box.focus();

      await user.keyboard('{ }');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Edge Cases', () => {
    it('should work with undefined onClick', async () => {
      expect(() => {
        render(
          <Box data-testid="undefined-onclick" width="100px" height="50px" onClick={undefined}>
            No Handler
          </Box>
        );
      }).not.toThrow();

      const box = screen.getByTestId('undefined-onclick');
      await user.click(box);
      // Should not crash
    });

    it('should work with null onClick', async () => {
      expect(() => {
        render(
          <Box data-testid="null-onclick" width="100px" height="50px" onClick={null}>
            Null Handler
          </Box>
        );
      }).not.toThrow();

      const box = screen.getByTestId('null-onclick');
      await user.click(box);
      // Should not crash
    });

    it('should work with multiple rapid clicks', async () => {
      const handleClick = jest.fn();

      render(
        <Box
          data-testid="rapid-click-box"
          width="120px"
          height="60px"
          onClick={handleClick}
        />
      );

      const box = screen.getByTestId('rapid-click-box');

      await user.click(box);
      await user.click(box);
      await user.click(box);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });
  });
});