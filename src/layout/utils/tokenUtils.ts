// 解析token值，支持CSS变量和自定义值
export const parseToken = (value: string | null): string | null => {
  if (!value || value === null) return null;

  // 如果是token格式（$前缀），转换为CSS变量
  if (value.startsWith('$')) {
    const tokenName = value.slice(1); // 移除$前缀
    return `var(--${tokenName})`;
  }

  // 否则直接返回原始值
  return value;
};

// 颜色token回退机制 - 当token不存在时回退到黑色
export const parseColorToken = (value: string | null, fallback: string = '#000000'): string | null => {
  if (!value || value === null) return null;

  if (value.startsWith('$')) {
    const tokenName = value.slice(1);
    // 使用CSS变量回退机制，优先使用token，不存在时使用fallback
    return `var(--${tokenName}, ${fallback})`;
  }

  return value;
};

// 尺寸token解析
export const parseSizeToken = (value: string | null): string | null => {
  return parseToken(value);
};

// 间距token解析
export const parseSpacingToken = (value: string | null): string | null => {
  return parseToken(value);
};

// 边框token解析
export const parseBorderToken = (value: string | null): string | null => {
  return parseToken(value);
};

// 透明度token解析（确保是0-1之间的数值）
export const parseOpacityToken = (value: string | null): string | null => {
  if (!value || value === null) return null;

  if (value.startsWith('$')) {
    return parseToken(value);
  }

  // 验证透明度值
  const num = parseFloat(value);
  if (isNaN(num) || num < 0 || num > 1) {
    return null;
  }

  return value;
};

// 获取stroke智能默认值
export const getStrokeDefaults = (props: {
  strokeColor?: string | null;
  strokeWeight?: string | null;
  strokeStyle?: string | null;
}) => {
  const { strokeColor, strokeWeight, strokeStyle } = props;

  // 判断是否设置了任何stroke属性
  const hasStrokeColor = strokeColor !== null && strokeColor !== undefined;
  const hasStrokeWeight = strokeWeight !== null && strokeWeight !== undefined;
  const hasStrokeStyle = strokeStyle !== null && strokeStyle !== undefined;

  // 如果没有任何stroke属性被设置，则返回null
  if (!hasStrokeColor && !hasStrokeWeight && !hasStrokeStyle) {
    return {
      strokeColor: null,
      strokeWeight: null,
      strokeStyle: null,
    };
  }

  // 智能补充缺失的默认值
  return {
    strokeColor: hasStrokeColor ? strokeColor : '$border', // 默认使用$border token
    strokeWeight: hasStrokeWeight ? strokeWeight : '1px',   // 默认1px
    strokeStyle: hasStrokeStyle ? strokeStyle : 'solid',   // 默认实线
  };
};