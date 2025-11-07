import React, { forwardRef } from 'react';
import { BoxProps, BoxTransientProps } from '../../types';
import { StyledBox } from './Box.styles';

// Box组件 - 基础容器组件
// Figma对应：Frame / Rectangle
export const Box = forwardRef<HTMLDivElement, BoxProps>(
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
      ...restProps
    },
    ref
  ) => {
    // 构建transient props
    const transientProps: BoxTransientProps = {
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
    };

    return (
      <StyledBox
        ref={ref}
        className={className}
        style={style}
        {...transientProps}
        {...restProps}
      >
        {children}
      </StyledBox>
    );
  }
);

Box.displayName = 'Box';