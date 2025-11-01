import React, { forwardRef } from 'react';
import { RowProps } from '../../types';
import { StyledRow } from './Row.styles';

// Row组件 - 水平布局容器
// Figma对应：Auto Layout (Horizontal)
export const Row = forwardRef<HTMLDivElement, RowProps>(
  (
    {
      children,
      className,
      style,
      wrap,
      ...layoutProps
    },
    ref
  ) => {
    return (
      <StyledRow
        ref={ref}
        className={className}
        style={style}
        wrap={wrap}
        {...layoutProps}
      >
        {children}
      </StyledRow>
    );
  }
);

Row.displayName = 'Row';