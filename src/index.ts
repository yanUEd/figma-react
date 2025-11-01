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

// 重新导出布局模块
export * from './layout';