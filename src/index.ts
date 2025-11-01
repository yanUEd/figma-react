import React from 'react';
import { StyleSheetManager } from 'styled-components';

// 配置shouldForwardProp过滤不需要的属性
const shouldForwardProp = (prop: string) => {
  // 允许的标准HTML属性
  const allowedHTMLProps = [
    'id', 'className', 'style', 'title', 'alt', 'tabIndex',
    'aria-label', 'aria-labelledby', 'aria-describedby', 'role',
    'data-testid', 'data-*'
  ];

  // 如果是允许的HTML属性，或者以data-开头的自定义属性，则forward
  if (allowedHTMLProps.includes(prop) || prop.startsWith('data-')) {
    return true;
  }

  // 过滤掉CSS属性和我们的内部属性
  const blockedProps = [
    // CSS属性
    'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
    'backgroundColor', 'color', 'padding', 'margin', 'border', 'borderRadius',
    'borderTop', 'borderBottom', 'borderLeft', 'borderRight',
    'borderWidth', 'borderStyle', 'borderColor',
    'position', 'top', 'left', 'right', 'bottom', 'zIndex', 'overflow',
    'display', 'flexDirection', 'flex', 'flexWrap', 'flexBasis',
    'justifyContent', 'alignItems', 'alignContent', 'gap',
    'boxShadow', 'opacity', 'transform', 'transition',
    'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'textAlign',
    'textDecoration', 'whiteSpace',
    // 我们的内部属性
    'distribution', 'alignment', 'strokeColor', 'strokeWeight', 'strokeStyle',
    'radius', 'fill'
  ];

  return !blockedProps.includes(prop);
};

// 配置StyleSheetManager
const StyleProvider = ({ children }: { children: React.ReactNode }) => {
  return React.createElement(
    StyleSheetManager,
    { shouldForwardProp },
    children
  );
};

// 导出StyleProvider供用户使用
export { StyleProvider };

// 导出所有组件
export { Box } from './components/Box';
export { Column } from './components/Column';
export { Row } from './components/Row';
export { ZStack } from './components/ZStack';

// 导出所有类型
export type {
  BoxProps,
  ColumnProps,
  RowProps,
  ZStackProps,
  BaseLayoutProps,
  Alignment,
  Distribution,
  Wrap,
  Overflow,
  WidthHeight,
  SpacingToken,
  ColorToken,
  BorderRadiusToken,
  StrokeStyle,
  DirectionValue,
  ParsedDirection,
  CSSConfig,
} from './types';

// 导出工具函数（供高级用户使用）
export {
  parseToken,
  parseColorToken,
  parseSizeToken,
  parseSpacingToken,
  parseBorderToken,
  parseOpacityToken,
  getStrokeDefaults,
} from './utils/tokenUtils';

export {
  parseDirection,
  generatePaddingCSS,
  generateBorderCSS,
  generateBorderRadiusCSS,
  getDirectionalValue,
} from './utils/directionParser';

export {
  mapAlignment,
  mapDistribution,
  mapSize,
  mapOverflow,
  generateCSSConfig,
  generateCSSString,
  generateCompleteCSS,
  getFlexDirection,
} from './utils/cssMapper';

// 导出默认配置
export { DEFAULTS } from './types';