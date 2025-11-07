import React, { forwardRef } from 'react';
import { RowProps, RowTransientProps } from '../../types';
import { StyledRow } from './Row.styles';

// Row组件 - 水平布局容器
// Figma对应：Auto Layout (Horizontal)
export const Row = forwardRef<HTMLDivElement, RowProps>(
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
      distribution,
      wrap,
      ...restProps
    },
    ref
  ) => {
    // 构建transient props
    const transientProps: RowTransientProps = {
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
      $distribution: distribution,
      $wrap: wrap,
    };

    return (
      <StyledRow
        ref={ref}
        className={className}
        style={style}
        {...transientProps}
        {...restProps}
      >
        {children}
      </StyledRow>
    );
  }
);

Row.displayName = 'Row';