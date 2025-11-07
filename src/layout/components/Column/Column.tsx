import React, { forwardRef } from 'react';
import { ColumnProps, ColumnTransientProps } from '../../types';
import { StyledColumn } from './Column.styles';

// Column组件 - 垂直布局容器
// Figma对应：Auto Layout (Vertical)
export const Column = forwardRef<HTMLDivElement, ColumnProps>(
  (
    {
      children,
      className,
      style,
      width,
      height,
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      alignment,
      gap,
      padding,
      overflow,
      fill,
      strokeColor,
      strokeWeight,
      strokeStyle,
      radius,
      opacity,
      ...restProps
    },
    ref
  ) => {
    // 构建transient props
    const transientProps: ColumnTransientProps = {
      $width: width,
      $height: height,
      $minWidth: minWidth,
      $maxWidth: maxWidth,
      $minHeight: minHeight,
      $maxHeight: maxHeight,
      $alignment: alignment,
      $gap: gap,
      $padding: padding,
      $overflow: overflow,
      $fill: fill,
      $strokeColor: strokeColor,
      $strokeWeight: strokeWeight,
      $strokeStyle: strokeStyle,
      $radius: radius,
      $opacity: opacity,
    };

    return (
      <StyledColumn
        ref={ref}
        className={className}
        style={style}
        {...transientProps}
        {...restProps}
      >
        {children}
      </StyledColumn>
    );
  }
);

Column.displayName = 'Column';