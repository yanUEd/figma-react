// Figma Layout 组件默认配置
// 可以手动修改这些值来调整组件的默认行为
// 支持设计 tokens，如 '$spacing-sm', '$color-primary' 等

import type {
  Alignment,
  Distribution,
  Overflow,
  WidthHeight,
  SpacingToken,
  ColorToken,
  BorderRadiusToken,
  StrokeStyle,
  CSSConfig
} from './types';

// 重新导出类型，供其他文件使用
export type {
  Alignment,
  Distribution,
  Overflow,
  WidthHeight,
  SpacingToken,
  ColorToken,
  BorderRadiusToken,
  StrokeStyle,
  CSSConfig
};

// 基础默认配置
export const LAYOUT_DEFAULTS = {
  // === 基础属性默认值 ===
  width: 'hug' as WidthHeight,
  height: 'hug' as WidthHeight,
  minWidth: null as string | null,
  maxWidth: null as string | null,
  minHeight: null as string | null,
  maxHeight: null as string | null,

  // 布局属性
  gap: '8px' as SpacingToken,         // 默认间距，可以修改为 '$spacing-sm' 或 '8px' 等
  padding: '0' as string,             // 默认内边距
  overflow: 'hidden' as Overflow,     // 默认溢出行为

  // 视觉属性
  fill: null as ColorToken | null,           // 默认背景色
  strokeColor: null as ColorToken | null,     // 默认边框颜色
  strokeWeight: null as string | null,        // 默认边框宽度
  strokeStyle: null as StrokeStyle | null,    // 默认边框样式
  radius: null as BorderRadiusToken | null,   // 默认圆角
  opacity: null as string | null,             // 默认透明度

  // 分布属性
  distribution: 'pack' as Distribution,

  // === 组件特定默认值 ===

  // Box 组件默认配置
  box: {
    alignment: 'top-left' as Alignment,
  },

  // Column 组件默认配置
  column: {
    alignment: 'top-center' as Alignment,    // 垂直布局：顶部开始，水平居中
    //gap: '8px' as SpacingToken,             // 继承基础默认值，可以在这里覆盖
    // gap: '$spacing-md' as SpacingToken,   // 或者使用设计 token
  },

  // Row 组件默认配置
  row: {
    alignment: 'center-left' as Alignment,   // 水平布局：左侧开始，垂直居中
    wrap: 'false' as 'true' | 'false',       // 默认不换行
    //gap: '8px' as SpacingToken,             // 继承基础默认值，可以在这里覆盖
    // gap: '$spacing-md' as SpacingToken,   // 或者使用设计 token
  },

  // ZStack 组件默认配置
  zstack: {
    alignment: 'center-center' as Alignment, // 层叠布局：完全居中
    overflow: 'hidden' as Overflow,         // 继承基础默认值，可以在这里覆盖
    // overflow: 'visible' as Overflow,      // 或者设置为可见溢出
  },
} as const;

// 为了向后兼容，导出原来的名字
export const DEFAULTS = LAYOUT_DEFAULTS;
export const COMPONENT_DEFAULTS = LAYOUT_DEFAULTS;

// 获取组件默认值的便捷函数（可选，主要用于类型推导）
export const getComponentDefaults = <T extends keyof typeof LAYOUT_DEFAULTS>(
  componentType: T
): typeof LAYOUT_DEFAULTS[T] => {
  return LAYOUT_DEFAULTS[componentType];
};
