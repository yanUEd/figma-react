import styled, { css } from 'styled-components';
import { ZStackProps } from '../../types';
import { generateCompleteCSS } from '../../utils/cssMapper';
import { Alignment } from '../../types';

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
export const generateZStackStyles = (props: ZStackProps) => {
  return css`
    ${generateCompleteCSS(props, 'zstack')}

    /* ZStack特定样式 - 覆盖flexbox以支持绝对定位 */
    display: block !important;
    position: relative;

    /* 确保ZStack容器有明确的包含块尺寸，支持子元素的百分比尺寸 */
    ${props.width ? css`width: ${props.width};` : ''}
    ${props.height ? css`height: ${props.height};` : ''}

    /* 重置默认样式 */
    box-sizing: border-box;
    margin: 0;

    /* 自定义样式和className支持 */
    ${props.style ? css(props.style) : ''}
    ${props.className ? '' : ''}
  `;
};

// ZStack容器
export const StyledZStack = styled.div<ZStackProps>`
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
  ${({ alignment = 'top-left' }) => {
    const alignmentStyles = childAlignmentMap[alignment as Alignment] || childAlignmentMap['top-left'];
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