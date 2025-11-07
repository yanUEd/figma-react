import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Box } from '../../layout/components/Box/Box';
import { Column } from '../../layout/components/Column/Column';
import { Row } from '../../layout/components/Row/Row';
import { ZStack } from '../../layout/components/ZStack/ZStack';

describe('Component Integration Tests', () => {
  describe('Box + nested components', () => {
    it('should render nested Box components with different alignments', () => {
      render(
        <Box data-testid="outer-box" alignment="center-center" padding="20px">
          <Box data-testid="inner-box" width="100px" height="50px" fill="blue">
            Inner Content
          </Box>
        </Box>
      );

      const outerBox = screen.getByTestId('outer-box');
      const innerBox = screen.getByTestId('inner-box');

      expect(outerBox).toBeInTheDocument();
      expect(innerBox).toBeInTheDocument();
      expect(screen.getByText('Inner Content')).toBeInTheDocument();
    });

    it('should handle deeply nested layout structures', () => {
      render(
        <Box data-testid="level-1" padding="10px">
          <Box data-testid="level-2" gap="10px">
            <Box data-testid="level-3a" width="50px" height="30px" fill="red" />
            <Box data-testid="level-3b" width="60px" height="40px" fill="green" />
          </Box>
        </Box>
      );

      expect(screen.getByTestId('level-1')).toBeInTheDocument();
      expect(screen.getByTestId('level-2')).toBeInTheDocument();
      expect(screen.getByTestId('level-3a')).toBeInTheDocument();
      expect(screen.getByTestId('level-3b')).toBeInTheDocument();
    });

    it('should handle Box with complex props combinations', () => {
      render(
        <Box
          data-testid="complex-box"
          width="300px"
          height="200px"
          alignment="center-center"
          gap="15px"
          padding="20px"
          fill="$background"
          strokeColor="$border"
          strokeWeight="2px"
          radius="8px"
          overflow="hidden"
        >
          <Box width="100px" height="50px" fill="$primary" />
          <Box width="80px" height="40px" fill="$secondary" />
        </Box>
      );

      const complexBox = screen.getByTestId('complex-box');
      expect(complexBox).toBeInTheDocument();

      // Check that nested boxes are rendered
      expect(complexBox.children).toHaveLength(2);
    });
  });

  describe('Column + Box integration', () => {
    it('should render Column with Box children', () => {
      render(
        <Column data-testid="column" gap="10px" padding="15px">
          <Box data-testid="box1" height="30px" fill="red" />
          <Box data-testid="box2" height="40px" fill="blue" />
          <Box data-testid="box3" height="50px" fill="green" />
        </Column>
      );

      const column = screen.getByTestId('column');
      const box1 = screen.getByTestId('box1');
      const box2 = screen.getByTestId('box2');
      const box3 = screen.getByTestId('box3');

      expect(column).toBeInTheDocument();
      expect(box1).toBeInTheDocument();
      expect(box2).toBeInTheDocument();
      expect(box3).toBeInTheDocument();
    });

    it('should handle Column with different alignments', () => {
      render(
        <Column data-testid="column" alignment="center-center" width="200px">
          <Box width="100px" height="30px" fill="blue" />
          <Box width="120px" height="30px" fill="red" />
          <Box width="80px" height="30px" fill="green" />
        </Column>
      );

      const column = screen.getByTestId('column');
      expect(column).toBeInTheDocument();
      expect(column.children).toHaveLength(3);
    });

    it('should handle Column with overflow behavior', () => {
      render(
        <Column
          data-testid="column"
          width="200px"
          height="100px"
          overflow="scroll"
          padding="10px"
        >
          <Box height="80px" fill="red" />
          <Box height="80px" fill="blue" />
          <Box height="80px" fill="green" />
        </Column>
      );

      const column = screen.getByTestId('column');
      expect(column).toBeInTheDocument();
      expect(column.children).toHaveLength(3);
    });
  });

  describe('Row + Box integration', () => {
    it('should render Row with Box children', () => {
      render(
        <Row data-testid="row" gap="15px" padding="20px">
          <Box data-testid="box1" width="60px" height="40px" fill="purple" />
          <Box data-testid="box2" width="80px" height="40px" fill="orange" />
          <Box data-testid="box3" width="100px" height="40px" fill="pink" />
        </Row>
      );

      const row = screen.getByTestId('row');
      expect(row).toBeInTheDocument();
      expect(screen.getByTestId('box1')).toBeInTheDocument();
      expect(screen.getByTestId('box2')).toBeInTheDocument();
      expect(screen.getByTestId('box3')).toBeInTheDocument();
    });

    it('should handle Row with wrapping', () => {
      render(
        <Row
          data-testid="row"
          width="200px"
          wrap="true"
          gap="10px"
          padding="15px"
        >
          <Box width="150px" height="30px" fill="cyan" />
          <Box width="150px" height="30px" fill="magenta" />
          <Box width="150px" height="30px" fill="yellow" />
        </Row>
      );

      const row = screen.getByTestId('row');
      expect(row).toBeInTheDocument();
      expect(row.children).toHaveLength(3);
    });

    it('should handle Row with distribution', () => {
      render(
        <Row
          data-testid="row"
          width="400px"
          distribution="space-between"
          padding="10px"
        >
          <Box width="80px" height="30px" fill="brown" />
          <Box width="100px" height="30px" fill="gray" />
          <Box width="60px" height="30px" fill="navy" />
        </Row>
      );

      const row = screen.getByTestId('row');
      expect(row).toBeInTheDocument();
      expect(row.children).toHaveLength(3);
    });
  });

  describe('ZStack + Box integration', () => {
    it('should render ZStack with layered Box components', () => {
      render(
        <ZStack data-testid="zstack" width="200px" height="150px">
          <Box
            data-testid="background-box"
            width="200px"
            height="150px"
            fill="lightblue"
            radius="10px"
          />
          <Box
            data-testid="content-box"
            width="160px"
            height="100px"
            fill="white"
            alignment="center-center"
          >
            Stacked Content
          </Box>
        </ZStack>
      );

      const zstack = screen.getByTestId('zstack');
      const backgroundBox = screen.getByTestId('background-box');
      const contentBox = screen.getByTestId('content-box');

      expect(zstack).toBeInTheDocument();
      expect(backgroundBox).toBeInTheDocument();
      expect(contentBox).toBeInTheDocument();
      expect(screen.getByText('Stacked Content')).toBeInTheDocument();
    });

    it('should handle ZStack with multiple layers', () => {
      render(
        <ZStack data-testid="zstack" width="300px" height="200px">
          <Box width="300px" height="200px" fill="red" radius="15px" />
          <Box width="280px" height="180px" fill="blue" radius="12px" />
          <Box width="260px" height="160px" fill="green" radius="10px" />
          <Box width="240px" height="140px" fill="yellow" radius="8px" />
        </ZStack>
      );

      const zstack = screen.getByTestId('zstack');
      expect(zstack).toBeInTheDocument();
      expect(zstack.children).toHaveLength(4);
    });

    it('should handle ZStack with centered content', () => {
      render(
        <ZStack data-testid="zstack" width="250px" height="180px">
          <Box width="250px" height="180px" fill="#f0f0f0" radius="12px" />
          <Box
            width="200px"
            height="120px"
            fill="white"
            strokeColor="gray"
            strokeWeight="1px"
            radius="8px"
            alignment="center-center"
            padding="20px"
          >
            <Box fill="blue" radius="4px" />
          </Box>
        </ZStack>
      );

      const zstack = screen.getByTestId('zstack');
      expect(zstack).toBeInTheDocument();
      expect(zstack.children).toHaveLength(2);
    });
  });

  describe('Complex nested layouts', () => {
    it('should handle Column containing Row components', () => {
      render(
        <Column data-testid="main-column" gap="20px" padding="25px">
          <Box height="40px" fill="red" alignment="center-center">
            Header
          </Box>
          <Row data-testid="content-row" gap="15px">
            <Box width="100px" height="80px" fill="blue" />
            <Box width="100px" height="80px" fill="green" />
          </Row>
          <Box height="30px" fill="gray" alignment="center-center">
            Footer
          </Box>
        </Column>
      );

      const mainColumn = screen.getByTestId('main-column');
      const contentRow = screen.getByTestId('content-row');

      expect(mainColumn).toBeInTheDocument();
      expect(contentRow).toBeInTheDocument();
      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
      expect(mainColumn.children).toHaveLength(3);
      expect(contentRow.children).toHaveLength(2);
    });

    it('should handle Row containing Column components', () => {
      render(
        <Row data-testid="main-row" gap="30px" padding="20px">
          <Column data-testid="sidebar" width="150px" gap="10px">
            <Box height="30px" fill="purple" />
            <Box height="30px" fill="purple" />
            <Box height="30px" fill="purple" />
          </Column>
          <Column data-testid="content" gap="15px">
            <Box height="60px" fill="cyan" />
            <Box height="40px" fill="orange" />
            <Box height="80px" fill="pink" />
          </Column>
        </Row>
      );

      const mainRow = screen.getByTestId('main-row');
      const sidebar = screen.getByTestId('sidebar');
      const content = screen.getByTestId('content');

      expect(mainRow).toBeInTheDocument();
      expect(sidebar).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(mainRow.children).toHaveLength(2);
      expect(sidebar.children).toHaveLength(3);
      expect(content.children).toHaveLength(3);
    });

    it('should handle deeply mixed layout patterns', () => {
      render(
        <Box data-testid="container" padding="20px">
          <Column gap="15px">
            <Row data-testid="header-row" distribution="space-between">
              <Box width="100px" height="40px" fill="blue" />
              <Box width="200px" height="40px" fill="green" />
              <Box width="100px" height="40px" fill="red" />
            </Row>

            <Row data-testid="content-row" gap="20px">
              <Column data-testid="left-column" width="200px" gap="10px">
                <Box height="60px" fill="purple" />
                <Box height="80px" fill="orange" />
                <Box height="40px" fill="pink" />
              </Column>

              <ZStack data-testid="right-stack" width="250px" height="180px">
                <Box width="250px" height="180px" fill="lightgray" radius="12px" />
                <Box width="220px" height="140px" fill="white" radius="8px" alignment="center-center">
                  Centered Content
                </Box>
              </ZStack>
            </Row>

            <Box height="30px" fill="gray" alignment="center-center">
              Footer Area
            </Box>
          </Column>
        </Box>
      );

      const container = screen.getByTestId('container');
      const headerRow = screen.getByTestId('header-row');
      const contentRow = screen.getByTestId('content-row');
      const leftColumn = screen.getByTestId('left-column');
      const rightStack = screen.getByTestId('right-stack');

      expect(container).toBeInTheDocument();
      expect(headerRow).toBeInTheDocument();
      expect(contentRow).toBeInTheDocument();
      expect(leftColumn).toBeInTheDocument();
      expect(rightStack).toBeInTheDocument();
      expect(screen.getByText('Centered Content')).toBeInTheDocument();
      expect(screen.getByText('Footer Area')).toBeInTheDocument();
    });
  });

  describe('Dynamic content updates', () => {
    it('should handle dynamic children addition', () => {
      const { rerender } = render(
        <Column data-testid="dynamic-column" gap="10px">
          <Box height="30px" fill="blue" />
        </Column>
      );

      const column = screen.getByTestId('dynamic-column');
      expect(column.children).toHaveLength(1);

      rerender(
        <Column data-testid="dynamic-column" gap="10px">
          <Box height="30px" fill="blue" />
          <Box height="30px" fill="red" />
          <Box height="30px" fill="green" />
        </Column>
      );

      expect(column.children).toHaveLength(3);
    });

    it('should handle prop changes on complex layouts', () => {
      const { rerender } = render(
        <Row data-testid="dynamic-row" distribution="pack">
          <Box width="50px" height="30px" fill="blue" />
          <Box width="50px" height="30px" fill="red" />
        </Row>
      );

      const row = screen.getByTestId('dynamic-row');
      expect(row).toBeInTheDocument();

      rerender(
        <Row data-testid="dynamic-row" distribution="space-between">
          <Box width="50px" height="30px" fill="blue" />
          <Box width="50px" height="30px" fill="red" />
        </Row>
      );

      expect(row).toBeInTheDocument();
      expect(row.children).toHaveLength(2);
    });
  });

  describe('Error handling and edge cases', () => {
    it('should handle missing children gracefully', () => {
      render(
        <Column data-testid="empty-column" gap="10px">
          {null}
          {undefined}
        </Column>
      );

      const column = screen.getByTestId('empty-column');
      expect(column).toBeInTheDocument();
      expect(column.children).toHaveLength(0);
    });

    it('should handle mixed valid and invalid children', () => {
      render(
        <Row data-testid="mixed-row" gap="5px">
          <Box width="40px" height="30px" fill="blue" />
          {null}
          <Box width="40px" height="30px" fill="red" />
          {false}
          <span>Text Node</span>
        </Row>
      );

      const row = screen.getByTestId('mixed-row');
      expect(row).toBeInTheDocument();
      expect(screen.getByText('Text Node')).toBeInTheDocument();
    });

    it('should handle complex nested structures with conditional rendering', () => {
      const { rerender } = render(
        <Column data-testid="conditional-column" gap="10px">
          <Box height="30px" fill="blue" />
          {false && <Box height="30px" fill="red" />}
          <Box height="30px" fill="green" />
        </Column>
      );

      const column = screen.getByTestId('conditional-column');
      expect(column.children).toHaveLength(2);

      rerender(
        <Column data-testid="conditional-column" gap="10px">
          <Box height="30px" fill="blue" />
          {true && <Box height="30px" fill="red" />}
          <Box height="30px" fill="green" />
        </Column>
      );

      expect(column.children).toHaveLength(3);
    });
  });
});