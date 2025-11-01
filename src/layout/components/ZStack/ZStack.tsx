import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { ZStackProps } from '../../types';
import { StyledZStack, StyledZStackChild } from './ZStack.styles';
import { Alignment } from '../../types';

// ZStack组件 - 层叠布局容器
// Figma对应：Frame with Absolute Positioning
export const ZStack = forwardRef<HTMLDivElement, ZStackProps>(
  (
    {
      children,
      className,
      style,
      ...layoutProps
    },
    ref
  ) => {
    const childrenArray = Children.toArray(children);

    // 为每个子元素包装定位容器，先定义的元素在上层（更高的z-index）
    const styledChildren = childrenArray
      .reverse() // 反转数组，让第一个元素在最上层
      .map((child, index) => {
        if (isValidElement(child)) {
          const childProps = child.props as any;
          const alignment = childProps.alignment || layoutProps.alignment;

          return (
            <StyledZStackChild
              key={`zstack-child-${index}`}
              zIndex={index + 1}
              alignment={alignment as Alignment}
            >
              {child}
            </StyledZStackChild>
          );
        }
        return child;
      })
      .reverse(); // 再次反转，保持原始顺序

    return (
      <StyledZStack
        ref={ref}
        className={className}
        style={style}
        {...layoutProps}
      >
        {styledChildren}
      </StyledZStack>
    );
  }
);

ZStack.displayName = 'ZStack';