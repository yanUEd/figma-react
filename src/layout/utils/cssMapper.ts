import { Alignment, Distribution, Overflow, WidthHeight, CSSConfig } from '../types';
import { parseToken, parseColorToken, parseSizeToken, parseSpacingToken, parseOpacityToken, getStrokeDefaults } from './tokenUtils';
import { parseDirection, generatePaddingCSS, generateBorderCSS, generateBorderRadiusCSS } from './directionParser';

// 映射alignment到CSS属性
export const mapAlignment = (alignment: Alignment): { alignItems: string; justifyContent: string } => {
  const alignmentMap: Record<Alignment, { alignItems: string; justifyContent: string }> = {
    'top-left': { alignItems: 'flex-start', justifyContent: 'flex-start' },
    'top-center': { alignItems: 'flex-start', justifyContent: 'center' },
    'top-right': { alignItems: 'flex-start', justifyContent: 'flex-end' },
    'center-left': { alignItems: 'center', justifyContent: 'flex-start' },
    'center-center': { alignItems: 'center', justifyContent: 'center' },
    'center-right': { alignItems: 'center', justifyContent: 'flex-end' },
    'bottom-left': { alignItems: 'flex-end', justifyContent: 'flex-start' },
    'bottom-center': { alignItems: 'flex-end', justifyContent: 'center' },
    'bottom-right': { alignItems: 'flex-end', justifyContent: 'flex-end' },
  };

  return alignmentMap[alignment] || alignmentMap['top-left'];
};

// 映射distribution到CSS属性
export const mapDistribution = (distribution: Distribution): string => {
  const distributionMap: Record<Distribution, string> = {
    'pack': 'flex-start',
    'center': 'center',
    'space': 'space-around',
    'space-between': 'space-between',
  };

  return distributionMap[distribution] || 'flex-start';
};

// 映射width/height到CSS属性
export const mapSize = (size: WidthHeight | undefined): string => {
  if (!size || size === 'hug') return 'fit-content';
  if (size === 'fill') return '100%';
  return size;
};

// 映射overflow到CSS属性（支持容器类型的智能映射）
export const mapOverflow = (overflow: Overflow, containerType: 'box' | 'column' | 'row' | 'zstack'): string => {
  if (containerType === 'box' || containerType === 'zstack') {
    // Box和ZStack：直接映射
    return overflow;
  } else if (containerType === 'column') {
    // Column：垂直方向控制
    const overflowMap: Record<Overflow, { overflowX: string; overflowY: string }> = {
      'visible': { overflowX: 'visible', overflowY: 'visible' },
      'hidden': { overflowX: 'hidden', overflowY: 'hidden' },
      'scroll': { overflowX: 'visible', overflowY: 'scroll' },
      'auto': { overflowX: 'visible', overflowY: 'auto' },
    };
    const { overflowX, overflowY } = overflowMap[overflow] || overflowMap['hidden'];
    return `overflow-x: ${overflowX}; overflow-y: ${overflowY};`;
  } else if (containerType === 'row') {
    // Row：水平方向控制
    const overflowMap: Record<Overflow, { overflowX: string; overflowY: string }> = {
      'visible': { overflowX: 'visible', overflowY: 'visible' },
      'hidden': { overflowX: 'hidden', overflowY: 'hidden' },
      'scroll': { overflowX: 'scroll', overflowY: 'visible' },
      'auto': { overflowX: 'auto', overflowY: 'visible' },
    };
    const { overflowX, overflowY } = overflowMap[overflow] || overflowMap['hidden'];
    return `overflow-x: ${overflowX}; overflow-y: ${overflowY};`;
  }

  return overflow;
};

// 生成完整的CSS配置
export const generateCSSConfig = (
  props: any,
  containerType: 'box' | 'column' | 'row' | 'zstack' = 'box'
): CSSConfig => {
  const {
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    alignment,
    distribution,
    gap,
    padding,
    overflow,
    fill,
    strokeColor,
    strokeWeight,
    strokeStyle,
    radius,
    opacity,
  } = props;

  // 处理stroke智能默认值
  const strokeDefaults = getStrokeDefaults({
    strokeColor,
    strokeWeight,
    strokeStyle,
  });

  // 基础CSS配置
  const config: CSSConfig = {
    display: 'flex',
    flexDirection: getFlexDirection(containerType),
    ...mapAlignment(alignment || 'top-left'),
  };

  // ZStack特殊处理：不应用flexbox布局属性
  if (containerType === 'zstack') {
    delete (config as any).display;
    delete (config as any).flexDirection;
    delete (config as any).alignItems;
    delete (config as any).justifyContent;
  }

  // 尺寸属性
  if (width) config.width = mapSize(width as WidthHeight);
  if (height) config.height = mapSize(height as WidthHeight);
  if (minWidth) config.minWidth = parseSizeToken(minWidth) || undefined;
  if (maxWidth) config.maxWidth = parseSizeToken(maxWidth) || undefined;
  if (minHeight) config.minHeight = parseSizeToken(minHeight) || undefined;
  if (maxHeight) config.maxHeight = parseSizeToken(maxHeight) || undefined;

  // 布局属性
  if (gap) config.gap = parseSpacingToken(gap) || undefined;
  if (distribution && containerType !== 'column' && containerType !== 'zstack') {
    config.justifyContent = mapDistribution(distribution);
  }

  // 视觉属性
  if (fill) config.backgroundColor = parseColorToken(fill) || undefined;
  if (opacity) config.opacity = parseOpacityToken(opacity) || undefined;

  return config;
};

// 获取flex direction
export const getFlexDirection = (containerType: 'box' | 'column' | 'row' | 'zstack'): string => {
  const directionMap: Record<typeof containerType, string> = {
    'box': 'column',      // Box默认垂直布局
    'column': 'column',   // Column固定垂直
    'row': 'row',         // Row固定水平
    'zstack': 'column',   // ZStack不涉及布局，使用默认值
  };

  return directionMap[containerType] || 'column';
};

// 生成CSS字符串（用于样式化组件）
export const generateCSSString = (config: CSSConfig): string => {
  const cssProperties: string[] = [];

  Object.entries(config).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      // 将驼峰转换为kebab-case
      const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      cssProperties.push(`${cssProperty}: ${value};`);
    }
  });

  return cssProperties.join('\n');
};

// 生成完整的CSS（包括padding、border、radius等方向控制属性）
export const generateCompleteCSS = (
  props: any,
  containerType: 'box' | 'column' | 'row' | 'zstack' = 'box'
): string => {
  const config = generateCSSConfig(props, containerType);
  const cssParts: string[] = [generateCSSString(config)];

  // 处理padding
  if (props.padding) {
    cssParts.push(generatePaddingCSS(props.padding));
  }

  // 处理border
  const strokeDefaults = getStrokeDefaults({
    strokeColor: props.strokeColor,
    strokeWeight: props.strokeWeight,
    strokeStyle: props.strokeStyle,
  });

  if (strokeDefaults.strokeColor && strokeDefaults.strokeWeight && strokeDefaults.strokeStyle) {
    const parsedColor = props.strokeColor ? parseDirection(props.strokeColor) : undefined;
    const parsedWeight = props.strokeWeight ? parseDirection(props.strokeWeight) : undefined;
    const parsedStyle = props.strokeStyle ? parseDirection(props.strokeStyle) : undefined;

    const color = parseColorToken(strokeDefaults.strokeColor!) || '#000000';
    const weight = parseSizeToken(strokeDefaults.strokeWeight!) || '1px';
    const style = strokeDefaults.strokeStyle || 'solid';

    cssParts.push(generateBorderCSS(color, weight, style, parsedColor, parsedWeight, parsedStyle));
  }

  // 处理border-radius
  if (props.radius) {
    const parsedRadius = parseDirection(props.radius);
    const radius = parseSizeToken(props.radius) || '0';
    cssParts.push(generateBorderRadiusCSS(radius, parsedRadius));
  }

  // 处理overflow
  if (props.overflow) {
    const overflowCSS = mapOverflow(props.overflow, containerType);
    if (overflowCSS.includes(':')) {
      // 包含多个overflow属性
      cssParts.push(overflowCSS);
    } else {
      cssParts.push(`overflow: ${overflowCSS};`);
    }
  }

  return cssParts.filter(Boolean).join('\n');
};