import styled, { css } from 'styled-components';
import { ZStackTransientProps } from '../../types';
import { generateCompleteCSS } from '../../utils/cssMapper';
import { Alignment, COMPONENT_DEFAULTS } from '../../config';
import { zstackShouldForwardProp } from '../../../utils/propFilter';

// 子元素对齐映射 - 纯绝对定位实现
const childAlignmentMap: Record<Alignment, { top?: string; right?: string; bottom?: string; left?: string; transform?: string }> = {
  'top-left': { top: '0', left: '0' },
  'top-center': { top: '0', left: '50%', transform: 'translateX(-50%)' },
  'top-right': { top: '0', right: '0' },
  'center-left': { top: '50%', left: '0', transform: 'translateY(-50%)' },
  'center-center': { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  'center-right': { top: '50%', right: '0', transform: 'translateY(-50%)' },
  'bottom-left': { bottom: '0', left: '0' },
  'bottom-center': { bottom: '0', left: '50%', transform: 'translateX(-50%)' },
  'bottom-right': { bottom: '0', right: '0' },
};

// 生成ZStack容器样式
export const generateZStackStyles = (props: ZStackTransientProps) => {
  // 将$前缀的props转换为普通props供CSS生成器使用
  const cssProps = {
    width: props.$width,
    height: props.$height,
    minWidth: props.$minWidth,
    maxWidth: props.$maxWidth,
    minHeight: props.$minHeight,
    maxHeight: props.$maxHeight,
    alignment: props.$alignment,
    padding: props.$padding,
    overflow: props.$overflow,
    fill: props.$fill,
    strokeColor: props.$strokeColor,
    strokeWeight: props.$strokeWeight,
    strokeStyle: props.$strokeStyle,
    radius: props.$radius,
    opacity: props.$opacity,
  };

  return css`
    ${generateCompleteCSS(cssProps, 'zstack')}

    /* ZStack特定样式 - 覆盖flexbox以支持绝对定位 */
    display: block !important;
    position: relative;

    /* 确保ZStack容器有明确的包含块尺寸，支持子元素的百分比尺寸 */
    ${props.$width ? css`width: ${props.$width};` : ''}
    ${props.$height ? css`height: ${props.$height};` : ''}

    /* 重置默认样式 */
    box-sizing: border-box;
    margin: 0;
  `;
};

// ZStack容器
export const StyledZStack = styled.div.withConfig({
  shouldForwardProp: zstackShouldForwardProp,
})<ZStackTransientProps>`
  ${({ ...props }) => generateZStackStyles(props)}
`;

// ZStack子元素样式
export const StyledZStackChild = styled.div<{
  zIndex: number;
  alignment?: Alignment;
}>`
  position: absolute;
  z-index: ${({ zIndex }) => zIndex};

  /* 统一的alignment定位处理 */
  ${({ alignment }) => {
    const defaultAlignment = COMPONENT_DEFAULTS.zstack.alignment;
    const finalAlignment = alignment || defaultAlignment;
    const alignmentStyles = childAlignmentMap[finalAlignment as Alignment] || childAlignmentMap[defaultAlignment];
    return css`
      ${alignmentStyles.top !== undefined ? css`top: ${alignmentStyles.top};` : ''}
      ${alignmentStyles.right !== undefined ? css`right: ${alignmentStyles.right};` : ''}
      ${alignmentStyles.bottom !== undefined ? css`bottom: ${alignmentStyles.bottom};` : ''}
      ${alignmentStyles.left !== undefined ? css`left: ${alignmentStyles.left};` : ''}
      ${alignmentStyles.transform ? css`transform: ${alignmentStyles.transform};` : ''}

      /* 让内部Box组件的百分比尺寸能正确计算 */
    `;
  }}
`;