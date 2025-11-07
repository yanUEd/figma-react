/**
 * 属性过滤工具
 * 智能管理 figma-react-layout 组件的属性转发
 */

// React 标准属性白名单（基于 React.HTMLAttributes<HTMLDivElement>）
const REACT_STANDARD_PROPS = new Set([
  // 基础属性
  'children', 'key', 'ref',

  // HTML 全局属性
  'id', 'className', 'class', 'style', 'title', 'lang', 'dir', 'hidden',
  'tabIndex', 'draggable', 'contentEditable', 'spellCheck', 'accessKey',

  // ARIA 属性
  'role', 'aria-activedescendant', 'aria-atomic', 'aria-autocomplete', 'aria-busy',
  'aria-checked', 'aria-colcount', 'aria-colindex', 'aria-colspan', 'aria-controls',
  'aria-current', 'aria-describedby', 'aria-details', 'aria-disabled', 'aria-dropeffect',
  'aria-errormessage', 'aria-expanded', 'aria-flowto', 'aria-grabbed', 'aria-haspopup',
  'aria-hidden', 'aria-invalid', 'aria-keyshortcuts', 'aria-label', 'aria-labelledby',
  'aria-level', 'aria-live', 'aria-modal', 'aria-multiline', 'aria-multiselectable',
  'aria-orientation', 'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed',
  'aria-readonly', 'aria-relevant', 'aria-required', 'aria-roledescription', 'aria-rowcount',
  'aria-rowindex', 'aria-rowspan', 'aria-selected', 'aria-setsize', 'aria-sort',
  'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext',

  // 数据属性
  'data-testid', 'data-cy', 'data-qa',

  // React 特殊属性
  'dangerouslySetInnerHTML', 'suppressContentEditableWarning', 'suppressHydrationWarning',
  'defaultChecked', 'defaultValue',

  // 表单相关属性
  'name', 'value', 'checked', 'disabled', 'readOnly', 'required', 'multiple', 'size',
  'maxLength', 'minLength', 'pattern', 'min', 'max', 'step', 'autoComplete', 'autoFocus',
  'autoCorrect', 'autoSave', 'inputMode', 'list', 'placeholder',

  // 媒体相关属性
  'src', 'srcSet', 'alt', 'height', 'width', 'sizes', 'crossOrigin', 'decoding', 'loading',
  'poster', 'preload', 'controls', 'loop', 'muted', 'playsInline', 'poster',

  // 链接相关属性
  'href', 'target', 'rel', 'download', 'hrefLang', 'type', 'referrerpolicy', 'ping',

  // 事件处理器（自动支持所有 on* 属性）
]);

// figma-react-layout 内部属性黑名单
const INTERNAL_LAYOUT_PROPS = new Set([
  // 布局属性
  'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
  'alignment', 'gap', 'padding', 'distribution', 'wrap', 'overflow',

  // 视觉属性
  'fill', 'strokeColor', 'strokeWeight', 'strokeStyle', 'radius', 'opacity',

  // 样式相关的 CSS 属性（作为备选过滤）
  'backgroundColor', 'color', 'margin', 'border', 'borderRadius',
  'position', 'top', 'left', 'right', 'bottom', 'zIndex',
  'display', 'flexDirection', 'flex', 'flexWrap', 'flexBasis',
  'justifyContent', 'alignItems', 'alignContent',
  'boxShadow', 'transform', 'transition',
  'fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'textAlign',
  'textDecoration', 'whiteSpace', 'overflowX', 'overflowY'
]);

/**
 * 检查属性是否为事件处理器
 * @param prop 属性名
 * @returns 是否为事件处理器
 */
export const isEventProp = (prop: string): boolean => {
  if (!prop || typeof prop !== 'string') return false;
  return (
    prop.startsWith('on') &&
    prop.length > 2 &&
    prop[2] === prop[2].toUpperCase()
  );
};

/**
 * 检查属性是否为数据属性
 * @param prop 属性名
 * @returns 是否为数据属性
 */
export const isDataProp = (prop: string): boolean => {
  if (!prop || typeof prop !== 'string') return false;
  return prop.startsWith('data-');
};

/**
 * 检查属性是否为 ARIA 属性
 * @param prop 属性名
 * @returns 是否为 ARIA 属性
 */
export const isAriaProp = (prop: string): boolean => {
  if (!prop || typeof prop !== 'string') return false;
  return prop.startsWith('aria-');
};

/**
 * 检查属性是否为 figma-react-layout 内部属性
 * @param prop 属性名
 * @returns 是否为内部属性
 */
export const isInternalLayoutProp = (prop: string): boolean => {
  return INTERNAL_LAYOUT_PROPS.has(prop);
};

/**
 * 检查属性是否为 React 标准属性
 * @param prop 属性名
 * @returns 是否为 React 标准属性
 */
export const isReactStandardProp = (prop: string): boolean => {
  if (!prop || typeof prop !== 'string') return false;
  return REACT_STANDARD_PROPS.has(prop);
};

/**
 * 智能的 shouldForwardProp 实现
 * 这个函数会：
 * 1. 过滤掉所有 transient props ($ 前缀)
 * 2. 过滤掉内部布局属性
 * 3. 允许所有 React 标准属性
 * 4. 自动允许所有事件处理器、数据属性、ARIA 属性
 * 5. 对未知属性采取保守策略，默认允许
 *
 * @param prop 属性名
 * @returns 是否应该转发该属性到 DOM
 */
export const smartShouldForwardProp = (prop: string): boolean => {
  if (!prop || typeof prop !== 'string') return true;

  // 1. 过滤 transient props
  if (prop.startsWith('$')) {
    return false;
  }

  // 2. 过滤内部布局属性
  if (isInternalLayoutProp(prop)) {
    return false;
  }

  // 3. 允许所有事件处理器
  if (isEventProp(prop)) {
    return true;
  }

  // 4. 允许数据属性
  if (isDataProp(prop)) {
    return true;
  }

  // 5. 允许 ARIA 属性
  if (isAriaProp(prop)) {
    return true;
  }

  // 6. 允许 React 标准属性
  if (isReactStandardProp(prop)) {
    return true;
  }

  // 7. 对未知属性采取保守策略，允许转发
  // 这样可以支持未来的新属性和自定义属性
  return true;
};

/**
 * 适用于 styled-components v6 的 shouldForwardProp
 * v6 中 shouldForwardProp 的签名是 (prop, defaultValidatorFn) => boolean
 * 需要调用 defaultValidatorFn 来决定是否转发 HTML 标准属性
 *
 * @param prop 属性名
 * @param defaultValidatorFn 默认验证器（v6 提供的）
 * @returns 是否应该转发该属性到 DOM
 */
export const v6ShouldForwardProp = (
  prop: string,
  defaultValidatorFn?: (prop: string) => boolean
): boolean => {
  if (!prop || typeof prop !== 'string') return true;

  // 1. 过滤 transient props
  if (prop.startsWith('$')) {
    return false;
  }

  // 2. 过滤内部布局属性
  if (isInternalLayoutProp(prop)) {
    return false;
  }

  // 3. 允许所有事件处理器（v6 必须显式声明）
  if (isEventProp(prop)) {
    return true;
  }

  // 4. 允许数据属性
  if (isDataProp(prop)) {
    return true;
  }

  // 5. 允许 ARIA 属性
  if (isAriaProp(prop)) {
    return true;
  }

  // 6. 允许 React 标准属性（使用默认验证器或自定义检查）
  try {
    if (typeof defaultValidatorFn === 'function') {
      return defaultValidatorFn(prop);
    }
  } catch (e) {
    // 如果默认验证器调用失败，继续使用白名单检查
  }

  // 7. 如果没有默认验证器但有 React 标准属性，检查白名单
  if (isReactStandardProp(prop)) {
    return true;
  }

  // 8. 对未知属性采取保守策略，允许转发
  return true;
};

/**
 * 创建针对特定组件的 shouldForwardProp
 * @param additionalInternalProps 额外的内部属性黑名单
 * @returns shouldForwardProp 函数
 */
export const createComponentShouldForwardProp = (
  additionalInternalProps: string[] = []
) => {
  const componentInternalProps = new Set([
    ...Array.from(INTERNAL_LAYOUT_PROPS),
    ...additionalInternalProps
  ]);

  return (prop: string): boolean => {
    // 1. 过滤 transient props
    if (prop.startsWith('$')) {
      return false;
    }

    // 2. 过滤组件内部属性
    if (componentInternalProps.has(prop)) {
      return false;
    }

    // 3. 允许所有事件处理器
    if (isEventProp(prop)) {
      return true;
    }

    // 4. 允许数据属性
    if (isDataProp(prop)) {
      return true;
    }

    // 5. 允许 ARIA 属性
    if (isAriaProp(prop)) {
      return true;
    }

    // 6. 允许 React 标准属性
    if (isReactStandardProp(prop)) {
      return true;
    }

    // 7. 对未知属性采取保守策略，允许转发
    return true;
  };
};

// 导出常用的组合
export const boxShouldForwardProp = createComponentShouldForwardProp(['distribution']);
export const rowShouldForwardProp = createComponentShouldForwardProp(['distribution', 'wrap']);
export const columnShouldForwardProp = createComponentShouldForwardProp(['distribution']);
export const zstackShouldForwardProp = createComponentShouldForwardProp(['gap', 'distribution']);