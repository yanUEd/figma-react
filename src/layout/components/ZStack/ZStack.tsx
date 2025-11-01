import React, { forwardRef, Children, isValidElement, cloneElement } from 'react';
import { ZStackProps } from '../../types';
import { StyledZStack } from './ZStack.styles';
import { Alignment } from '../../types';

// 对齐样式映射
const childAlignmentMap: Record<Alignment, { top?: string; right?: string; bottom?: string; left?: string; transform?: string }> = {
  'top-left': { top: '0', left: '0' },
  'top-center': { top: '0', left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: '0', right: '0' },
  'center-left': { top: '50%', left: '0', transform: 'translateY(-50%)' },
  'center-center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  'center-right': { top: '50%', right: '0', transform: 'translateY(-50%)' },
  'bottom-left': { bottom: '0', left: '0' },
  'bottom-center': { bottom: '0', left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: '0', right: '0' },
};

// 获取对齐样式
const getAlignmentStyles = (alignment?: Alignment) => {
  const alignmentStyles = childAlignmentMap[alignment as Alignment] || childAlignmentMap['top-left'];
  return alignmentStyles;
};

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
    const validChildren = childrenArray.filter(child => isValidElement(child));
    const styledChildren = validChildren
      .reverse() // 反转数组，让第一个元素在最上层
      .map((child, index) => {
        const childProps = child.props as any;

        // ZStack子元素alignment逻辑：
        // - 如果子元素明确设置了alignment，使用子元素的alignment
        // - 如果子元素没有设置alignment，继承容器的alignment
        // 这样所有元素都统一处理，无需特殊的背景检测
        const alignment = childProps.alignment !== undefined ? childProps.alignment : layoutProps.alignment;

        // 从子元素中移除alignment属性，避免子元素自己处理alignment
        const { alignment: childAlignment, ...childPropsClean } = childProps;

        // 直接将ZStack的定位和层级应用到子元素本身
        const enhancedChild = cloneElement(child, {
          ...childPropsClean,
          style: {
            ...childPropsClean.style,
            position: 'absolute',
            zIndex: index + 1,
            ...getAlignmentStyles(alignment)
          }
        });

        return enhancedChild;
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