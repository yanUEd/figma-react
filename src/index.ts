import React from 'react';
import { StyleSheetManager } from 'styled-components';

// 配置shouldForwardProp过滤不需要的属性
const shouldForwardProp = (prop: string) => {
  // 过滤所有$前缀的transient props
  if (prop.startsWith('$')) {
    return false;
  }

  // 允许的标准HTML属性
  const allowedHTMLProps = [
    'id', 'className', 'style', 'title', 'alt', 'tabIndex',
    'aria-label', 'aria-labelledby', 'aria-describedby', 'role',
    'data-testid'
  ];

  // 如果是允许的HTML属性，或者以data-开头的自定义属性，则forward
  if (allowedHTMLProps.includes(prop) || prop.startsWith('data-')) {
    return true;
  }

  // 过滤掉我们的内部属性（保持向后兼容）
  const blockedProps = [
    // 我们的内部属性
    'distribution', 'alignment', 'strokeColor', 'strokeWeight', 'strokeStyle',
    'radius', 'fill', 'gap', 'padding', 'wrap',
    // CSS属性（作为备选过滤）
    'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
    'backgroundColor', 'color', 'margin', 'border', 'borderRadius',
    'position', 'top', 'left', 'right', 'bottom', 'zIndex',
    'display', 'flexDirection', 'flex', 'flexWrap', 'flexBasis',
    'justifyContent', 'alignItems', 'alignContent',
    'boxShadow', 'opacity', 'transform', 'transition',
    'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'textAlign',
    'textDecoration', 'whiteSpace'
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