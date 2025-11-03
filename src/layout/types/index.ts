// 布局属性
export type Alignment =
  | 'top-left' | 'top-center' | 'top-right'
  | 'center-left' | 'center-center' | 'center-right'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type Distribution = 'pack' | 'center' | 'space' | 'space-between';
export type Wrap = 'true' | 'false';
export type Overflow = 'visible' | 'hidden' | 'scroll' | 'auto';

// 尺寸属性
export type WidthHeight = 'fill' | 'hug' | string;

// Token类型
export type SpacingToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
export type ColorToken = string;
export type BorderRadiusToken = 'none' | 'sm' | 'md' | 'lg' | string;

// 边框样式
export type StrokeStyle = 'solid' | 'dashed' | 'dotted' | 'double' | 'groove' | 'ridge' | 'inset' | 'outset' | null;

// 基础组件Props接口
export interface BaseLayoutProps {
  // 布局属性
  width?: WidthHeight;
  height?: WidthHeight;
  minWidth?: string | null;
  maxWidth?: string | null;
  minHeight?: string | null;
  maxHeight?: string | null;
  alignment?: Alignment;
  gap?: SpacingToken;
  padding?: string;
  overflow?: Overflow;

  // 视觉属性
  fill?: ColorToken | null;
  strokeColor?: ColorToken | null;
  strokeWeight?: string | null;
  strokeStyle?: StrokeStyle;
  radius?: BorderRadiusToken | null;
  opacity?: string | null;

  // 其他HTML属性
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Box 组件Props
export interface BoxProps extends BaseLayoutProps {
  distribution?: Distribution;
}

// Column 组件Props (继承Box，但不需要distribution)
export interface ColumnProps extends Omit<BoxProps, 'distribution'> {}

// Row 组件Props
export interface RowProps extends BoxProps {
  wrap?: Wrap;
}

// ZStack 组件Props (继承Box，但不需要gap和distribution)
export interface ZStackProps extends Omit<BoxProps, 'gap' | 'distribution'> {}

// 方向控制相关类型
export interface DirectionValue {
  direction: string;
  value: string;
}

// 解析后的方向控制结果
export interface ParsedDirection {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  x?: string;
  y?: string;
  'top-left'?: string;
  'top-right'?: string;
  'bottom-left'?: string;
  'bottom-right'?: string;
}

// CSS生成配置
export interface CSSConfig {
  width?: string;
  height?: string;
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  display: string;
  flexDirection: string;
  alignItems: string;
  justifyContent: string;
  gap?: string;
  padding?: string;
  overflow?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  opacity?: string;
  position?: string;
  flexWrap?: string;
}

// 基础默认配置
export const DEFAULTS = {
  width: 'hug',
  height: 'hug',
  alignment: 'top-left',
  distribution: 'pack' as Distribution,
  gap: '0',
  padding: '0',
  overflow: 'hidden' as Overflow,
  fill: null,
  strokeColor: null,
  strokeWeight: null,
  strokeStyle: null,
  radius: null,
  opacity: null,
  minWidth: null,
  maxWidth: null,
  minHeight: null,
  maxHeight: null,
} as const;

// 组件特定的默认配置
export const COMPONENT_DEFAULTS = {
  box: {
    ...DEFAULTS,
    alignment: 'top-left' as const,
  },
  column: {
    ...DEFAULTS,
    alignment: 'top-center' as const, // 顶部开始，水平居中
  },
  row: {
    ...DEFAULTS,
    alignment: 'center-left' as const, // 垂直居中，左侧开始
  },
  zstack: {
    ...DEFAULTS,
    alignment: 'center-center' as const, // 完全居中
  },
} as const;