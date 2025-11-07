import { ParsedDirection } from '../types';

// 解析方向控制语法
// 支持格式："$lg", "x:10px y:20px", "top:$primary right:$secondary"
export const parseDirection = (input: string): ParsedDirection => {
  const result: ParsedDirection = {};

  if (!input || typeof input !== 'string') return result;

  // 如果输入中没有冒号，则认为是全方向设置
  if (!input.includes(':')) {
    const value = input.trim();
    result.x = value;
    result.y = value;
    return result;
  }

  // 解析方向控制语法
  const parts = input.split(/\s+/); // 按空格分割
  parts.forEach(part => {
    const [direction, value] = part.split(':');
    if (direction && value) {
      const dir = direction.trim();
      const val = value.trim();
      result[dir as keyof ParsedDirection] = val;
    }
  });

  return result;
};

// 生成CSS属性 - padding
export const generatePaddingCSS = (padding: string): string => {
  const parsed = parseDirection(padding);
  const cssProperties: string[] = [];

  // 处理x/y方向（优先级更高）
  if (parsed.x) {
    cssProperties.push(`padding-left: ${parsed.x};`);
    cssProperties.push(`padding-right: ${parsed.x};`);
  }
  if (parsed.y) {
    cssProperties.push(`padding-top: ${parsed.y};`);
    cssProperties.push(`padding-bottom: ${parsed.y};`);
  }

  // 处理具体方向（会覆盖x/y设置）
  if (parsed.top) cssProperties.push(`padding-top: ${parsed.top};`);
  if (parsed.right) cssProperties.push(`padding-right: ${parsed.right};`);
  if (parsed.bottom) cssProperties.push(`padding-bottom: ${parsed.bottom};`);
  if (parsed.left) cssProperties.push(`padding-left: ${parsed.left};`);

  return cssProperties.join(' ');
};

// 生成CSS属性 - border (支持每个边的不同设置)
export const generateBorderCSS = (
  color: string,
  weight: string,
  style: string,
  colorParsed?: ParsedDirection,
  weightParsed?: ParsedDirection,
  styleParsed?: ParsedDirection
): string => {
  const cssProperties: string[] = [];

  // 如果没有方向控制，生成全边框
  const hasDirectionalColor = colorParsed && Object.keys(colorParsed).length > 0;
  const hasDirectionalWeight = weightParsed && Object.keys(weightParsed).length > 0;
  const hasDirectionalStyle = styleParsed && Object.keys(styleParsed).length > 0;

  if (!hasDirectionalColor && !hasDirectionalWeight && !hasDirectionalStyle) {
    // 全边框
    cssProperties.push(`border: ${weight} ${style} ${color};`);
  } else {
    // 方向性边框 - 分别处理每个边
    const edges = ['top', 'right', 'bottom', 'left'] as const;

    edges.forEach(edge => {
      const edgeColor = hasDirectionalColor ? (colorParsed?.[edge] || color) : color;
      const edgeWeight = hasDirectionalWeight ? (weightParsed?.[edge] || weight) : weight;
      const edgeStyle = hasDirectionalStyle ? (styleParsed?.[edge] || style) : style;

      cssProperties.push(`border-${edge}: ${edgeWeight} ${edgeStyle} ${edgeColor};`);
    });
  }

  return cssProperties.join(' ');
};

// 生成CSS属性 - border-radius (支持每个角的不同设置)
export const generateBorderRadiusCSS = (radius: string, radiusParsed?: ParsedDirection): string => {
  const cssProperties: string[] = [];

  if (!radiusParsed || Object.keys(radiusParsed).length === 0) {
    // 全圆角
    cssProperties.push(`border-radius: ${radius};`);
  } else {
    // 方向性圆角 - 分别处理每个角
    const corners = ['top-left', 'top-right', 'bottom-right', 'bottom-left'] as const;

    corners.forEach(corner => {
      const cornerRadius = radiusParsed?.[corner] || radius;
      cssProperties.push(`border-${corner}-radius: ${cornerRadius};`);
    });

    // 设置其他角为0（如果明确设置了某个角）
    if (radiusParsed['top-left'] && !radiusParsed['top-right'])
      cssProperties.push('border-top-right-radius: 0;');
    if (radiusParsed['top-right'] && !radiusParsed['top-left'])
      cssProperties.push('border-top-left-radius: 0;');
    if (radiusParsed['bottom-right'] && !radiusParsed['bottom-left'])
      cssProperties.push('border-bottom-left-radius: 0;');
    if (radiusParsed['bottom-left'] && !radiusParsed['bottom-right'])
      cssProperties.push('border-bottom-right-radius: 0;');
  }

  return cssProperties.join(' ');
};

// 获取方向性值（如果存在）
export const getDirectionalValue = (value: string, direction: string, parsed?: ParsedDirection): string | null => {
  if (!parsed) return null;
  return parsed[direction as keyof ParsedDirection] || null;
};