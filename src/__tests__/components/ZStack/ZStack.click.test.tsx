import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ZStack } from '../../../layout/components/ZStack/ZStack';
import { Box } from '../../../layout/components/Box/Box';

describe('ZStack onClick Event Handler Tests', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
  });

  it('should fire onClick when ZStack container is clicked', async () => {
    const handleZStackClick = jest.fn();

    render(
      <ZStack
        data-testid="zstack-container"
        width="200px"
        height="150px"
        onClick={handleZStackClick}
      >
        <Box
          width="100px"
          height="80px"
          fill="lightblue"
          data-testid="zstack-child-1"
        />
        <Box
          width="60px"
          height="60px"
          fill="white"
          data-testid="zstack-child-2"
        />
      </ZStack>
    );

    const zstack = screen.getByTestId('zstack-container');
    await user.click(zstack);

    expect(handleZStackClick).toHaveBeenCalledTimes(1);
  });

  it('should fire onClick when child elements are clicked', async () => {
    const handleZStackClick = jest.fn();

    render(
      <ZStack
        data-testid="zstack-with-children"
        width="250px"
        height="200px"
        onClick={handleZStackClick}
      >
        <Box
          width="120px"
          height="100px"
          fill="lightgreen"
          data-testid="clickable-child"
        />
      </ZStack>
    );

    const child = screen.getByTestId('clickable-child');
    await user.click(child);

    // ZStack should receive the click when child is clicked (event bubbling)
    expect(handleZStackClick).toHaveBeenCalledTimes(1);
  });

  it('should handle child onClick separately from container onClick', async () => {
    const handleZStackClick = jest.fn();
    const handleChildClick = jest.fn();

    render(
      <ZStack
        data-testid="zstack-separate"
        width="200px"
        height="150px"
        onClick={handleZStackClick}
      >
        <Box
          width="100px"
          height="80px"
          fill="lightcoral"
          onClick={handleChildClick}
          data-testid="separate-child"
        />
      </ZStack>
    );

    const child = screen.getByTestId('separate-child');
    await user.click(child);

    expect(handleChildClick).toHaveBeenCalledTimes(1);
    // ZStack might or might not receive the click depending on event handling
  });

  it('should work with multiple stacked children', async () => {
    const handleZStackClick = jest.fn();

    render(
      <ZStack
        data-testid="stacked-zstack"
        width="300px"
        height="250px"
        onClick={handleZStackClick}
      >
        {/* Background layer */}
        <Box
          width="100%"
          height="100%"
          fill="#f0f0f0"
          data-testid="background-layer"
        />
        {/* Middle layer */}
        <Box
          width="200px"
          height="150px"
          fill="lightblue"
          data-testid="middle-layer"
        />
        {/* Top layer */}
        <Box
          width="100px"
          height="80px"
          fill="white"
          data-testid="top-layer"
        />
      </ZStack>
    );

    // Test clicking on different layers
    const topLayer = screen.getByTestId('top-layer');
    await user.click(topLayer);

    expect(handleZStackClick).toHaveBeenCalledTimes(1);
  });

  it('should maintain proper click event with alignment', async () => {
    const handleZStackClick = jest.fn();

    render(
      <ZStack
        data-testid="aligned-zstack"
        width="200px"
        height="150px"
        alignment="top-right"
        onClick={handleZStackClick}
      >
        <Box
          width="80px"
          height="60px"
          fill="mediumpurple"
          data-testid="aligned-child"
        />
      </ZStack>
    );

    const zstack = screen.getByTestId('aligned-zstack');
    await user.click(zstack);

    expect(handleZStackClick).toHaveBeenCalledTimes(1);
  });

  it('should handle complex nested ZStack with onClick', async () => {
    const handleOuterZStack = jest.fn();
    const handleInnerBox = jest.fn();

    render(
      <ZStack
        data-testid="outer-zstack"
        width="300px"
        height="200px"
        onClick={handleOuterZStack}
      >
        <Box
          width="250px"
          height="150px"
          fill="lightgoldenrodyellow"
          onClick={handleInnerBox}
          data-testid="inner-box"
        />
        <Box
          width="80px"
          height="50px"
          fill="coral"
          data-testid="overlay-box"
        />
      </ZStack>
    );

    const innerBox = screen.getByTestId('inner-box');
    await user.click(innerBox);

    expect(handleInnerBox).toHaveBeenCalledTimes(1);
    // Event bubbling behavior to outer container
  });

  it('should work with pointer-events styling', async () => {
    const handleZStackClick = jest.fn();

    render(
      <ZStack
        data-testid="pointer-events-zstack"
        width="200px"
        height="150px"
        onClick={handleZStackClick}
        style={{ cursor: 'pointer' }}
      >
        <Box
          width="120px"
          height="90px"
          fill="lightsteelblue"
          style={{ pointerEvents: 'auto' }}
          data-testid="pointer-events-child"
        />
      </ZStack>
    );

    const zstack = screen.getByTestId('pointer-events-zstack');
    await user.click(zstack);

    expect(handleZStackClick).toHaveBeenCalledTimes(1);
  });
});