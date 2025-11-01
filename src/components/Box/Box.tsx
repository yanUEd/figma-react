import React, { forwardRef } from 'react';
import { BoxProps } from '../../types';
import { StyledBox } from './Box.styles';

// Box组件 - 基础容器组件
// Figma对应：Frame / Rectangle
export const Box = forwardRef<HTMLDivElement, BoxProps>(
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
      <StyledBox
        ref={ref}
        className={className}
        style={style}
        {...layoutProps}
      >
        {children}
      </StyledBox>
    );
  }
);

Box.displayName = 'Box';