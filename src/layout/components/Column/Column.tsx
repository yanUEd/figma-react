import React, { forwardRef } from 'react';
import { ColumnProps } from '../../types';
import { StyledColumn } from './Column.styles';

// Column组件 - 垂直布局容器
// Figma对应：Auto Layout (Vertical)
export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (
    {
      children,
      className,
      style,
      ...layoutProps
    },
    ref
  ) => {
    return (
      <StyledColumn
        ref={ref}
        className={className}
        style={style}
        {...layoutProps}
      >
        {children}
      </StyledColumn>
    );
  }
);

Column.displayName = 'Column';