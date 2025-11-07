# onClick Event Handlers Guide

This guide demonstrates how to use onClick event handlers with all figma-react-layout components.

## Overview

All figma-react-layout components (`Box`, `Column`, `Row`, `ZStack`) support standard React onClick event handlers. onClick props are correctly forwarded to the underlying DOM elements and work exactly like they would on regular HTML elements.

## Basic Usage

### Box Component

```jsx
import { Box } from 'figma-react-layout';

function Example() {
  const handleBoxClick = (event) => {
    console.log('Box clicked!', event);
  };

  return (
    <Box
      width="200px"
      height="100px"
      fill="blue"
      onClick={handleBoxClick}
    >
      Click me!
    </Box>
  );
}
```

### Column Component

```jsx
import { Column, Box } from 'figma-react-layout';

function Example() {
  const handleColumnClick = () => {
    alert('Column clicked!');
  };

  return (
    <Column
      width="300px"
      height="200px"
      fill="green"
      onClick={handleColumnClick}
      gap="10px"
    >
      <Box height="50px" fill="lightblue">Item 1</Box>
      <Box height="50px" fill="lightgreen">Item 2</Box>
    </Column>
  );
}
```

### Row Component

```jsx
import { Row, Box } from 'figma-react-layout';

function Example() {
  const handleRowClick = (event) => {
    console.log('Row coordinates:', event.clientX, event.clientY);
  };

  return (
    <Row
      width="400px"
      height="100px"
      fill="orange"
      onClick={handleRowClick}
      gap="20px"
    >
      <Box width="80px" height="60px" fill="white">Left</Box>
      <Box width="80px" height="60px" fill="yellow">Right</Box>
    </Row>
  );
}
```

### ZStack Component

```jsx
import { ZStack, Box } from 'figma-react-layout';

function Example() {
  const handleZStackClick = () => {
    console.log('ZStack clicked!');
  };

  return (
    <ZStack
      width="200px"
      height="150px"
      onClick={handleZStackClick}
    >
      {/* Background layer */}
      <Box
        position="absolute"
        width="100%"
        height="100%"
        fill="lightgray"
      />
      {/* Content layer */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="100px"
        height="60px"
        fill="purple"
      />
    </ZStack>
  );
}
```

## Advanced Usage

### Event Handling Patterns

#### With Event Object

```jsx
function Example() {
  const handleClick = (event) => {
    // Access event properties
    console.log('Target:', event.target);
    console.log('Current Target:', event.currentTarget);
    console.log('Coordinates:', event.clientX, event.clientY);

    // Stop propagation
    event.stopPropagation();

    // Prevent default behavior
    event.preventDefault();
  };

  return (
    <Box onClick={handleClick}>
      Advanced Click Handler
    </Box>
  );
}
```

#### Using useCallback for Performance

```jsx
import React, { useCallback } from 'react';

function Example({ data }) {
  const handleClick = useCallback((event) => {
    // Efficient handler that doesn't change on re-renders
    console.log('Clicked with data:', data);
  }, [data]);

  return <Box onClick={handleClick}>Optimized Click</Box>;
}
```

#### Multiple Event Handlers

```jsx
function Example() {
  const handleMouseDown = () => console.log('Mouse down');
  const handleMouseUp = () => console.log('Mouse up');
  const handleClick = () => console.log('Click');

  return (
    <Box
      width="150px"
      height="80px"
      fill="blue"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      Multiple Events
    </Box>
  );
}
```

### Nested Components

```jsx
function Example() {
  const handleParentClick = () => console.log('Parent clicked');
  const handleChildClick = (event) => {
    event.stopPropagation(); // Prevent parent click
    console.log('Child clicked');
  };

  return (
    <Column
      width="300px"
      height="200px"
      fill="lightblue"
      onClick={handleParentClick}
    >
      <Box
        height="60px"
        fill="red"
        onClick={handleChildClick}
      >
        Click me (child only)
      </Box>
      <Box
        height="60px"
        fill="green"
      >
        Click me (bubbles to parent)
      </Box>
    </Column>
  );
}
```

### Conditional Click Handlers

```jsx
function Example({ isClickable }) {
  const handleClick = () => {
    if (isClickable) {
      console.log('Component clicked');
    }
  };

  return (
    <Box
      width="200px"
      height="100px"
      fill={isClickable ? 'blue' : 'gray'}
      onClick={isClickable ? handleClick : undefined}
      style={{
        cursor: isClickable ? 'pointer' : 'default'
      }}
    >
      {isClickable ? 'Clickable' : 'Disabled'}
    </Box>
  );
}
```

## Accessibility

### Keyboard Support

For components that behave like buttons, add proper accessibility attributes:

```jsx
function AccessibleExample() {
  const handleClick = () => console.log('Accessible click');

  return (
    <Box
      width="200px"
      height="80px"
      fill="blue"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleClick();
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      Accessible Button
    </Box>
  );
}
```

### ARIA Attributes

```jsx
function AriaExample() {
  const [pressed, setPressed] = useState(false);

  const handleClick = () => setPressed(!pressed);

  return (
    <Box
      width="150px"
      height="60px"
      fill={pressed ? 'green' : 'gray'}
      onClick={handleClick}
      role="button"
      aria-pressed={pressed}
      aria-label="Toggle button"
      tabIndex={0}
    >
      {pressed ? 'Pressed' : 'Not Pressed'}
    </Box>
  );
}
```

## Styling Click Interactions

### Hover and Active States

```jsx
import styled from 'styled-components';

const ClickableBox = styled(Box)`
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
`;

function StyledExample() {
  const handleClick = () => console.log('Styled box clicked');

  return (
    <ClickableBox
      width="200px"
      height="100px"
      fill="blue"
      onClick={handleClick}
    >
      Styled Interaction
    </ClickableBox>
  );
}
```

### Using Style Prop

```jsx
function StyleExample() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      width="200px"
      height="100px"
      fill={isHovered ? 'darkblue' : 'blue'}
      onClick={() => console.log('Clicked')}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)'
      }}
    >
      Hover me!
    </Box>
  );
}
```

## Testing onClick Handlers

### Unit Testing

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Box } from 'figma-react-layout';

test('onClick handler works', () => {
  const handleClick = jest.fn();

  render(
    <Box
      data-testid="clickable-box"
      onClick={handleClick}
    >
      Click me
    </Box>
  );

  const box = screen.getByTestId('clickable-box');
  fireEvent.click(box);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### User Event Testing

```jsx
import userEvent from '@testing-library/user-event';

test('onClick with user interactions', async () => {
  const user = userEvent.setup();
  const handleClick = jest.fn();

  render(<Box onClick={handleClick}>Click me</Box>);

  const box = screen.getByText('Click me');
  await user.click(box);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

## Troubleshooting

### Common Issues and Solutions

#### onClick Not Firing

**Problem**: onClick handler doesn't execute when component is clicked.

**Solution**: Check that:
1. The onClick prop is correctly passed
2. The component has proper dimensions
3. No other element is covering the component
4. CSS `pointer-events: none` is not applied

#### Event Propagation Issues

**Problem**: Parent onClick fires when child is clicked unexpectedly.

**Solution**: Use `event.stopPropagation()` in the child handler:
```jsx
const handleChildClick = (event) => {
  event.stopPropagation();
  // Child-specific logic
};
```

#### Performance Issues

**Problem**: onClick handlers cause unnecessary re-renders.

**Solution**: Use `useCallback` to memoize handlers:
```jsx
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies]);
```

## Best Practices

1. **Use Descriptive Handler Names**: `handleSaveClick` instead of `handleClick`
2. **Type Safety**: Properly type event handlers in TypeScript
3. **Accessibility**: Add appropriate ARIA attributes and keyboard support
4. **Performance**: Use `useCallback` for handlers passed to multiple components
5. **Testing**: Always test click functionality with user interactions
6. **Error Handling**: Wrap click logic in try-catch blocks when necessary
7. **Visual Feedback**: Provide hover and active states for better UX

## Examples

The following files provide working examples:

- `test/onClick-examples.html` - Interactive examples in browser
- `test/onClick-debug.html` - Debug panel for testing onClick functionality
- `src/__tests__/components/onClick.test.tsx` - Comprehensive test suite

All examples demonstrate that onClick handlers work correctly across all figma-react-layout components.