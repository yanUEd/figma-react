import React from 'react';
import { StyleSheetManager } from 'styled-components';
import { smartShouldForwardProp } from './utils/propFilter';

// 使用智能的属性过滤机制，支持所有 React 标准属性
const shouldForwardProp = smartShouldForwardProp;

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