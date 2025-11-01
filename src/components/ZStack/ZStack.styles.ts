import styled, { css } from 'styled-components';
import { ZStackProps } from '../../types';
import { generateCompleteCSS } from '../../utils/cssMapper';
import { Alignment } from '../../types';

// 子元素对齐映射
const childAlignmentMap: Record<Alignment, { top?: string; right?: string; bottom?: string; left?: string; transform?: string }> = {
  'top-left': { top: '0', left: '0' },
  'top-center': { top: '0', left: '0', right: '0', transform: 'translateX(50%)' },
  'top-right': { top: '0', right: '0' },
  'center-left': { top: '0', bottom: '0', left: '0', transform: 'translateY(50%)' },
  'center-center': { top: '0', bottom: '0', left: '0', right: '0', transform: 'translate(50%, 50%)' },
  'center-right': { top: '0', bottom: '0', right: '0', transform: 'translateY(50%)' },
  'bottom-left': { bottom: '0', left: '0' },
  'bottom-center': { bottom: '0', left: '0', right: '0', transform: 'translateX(50%)' },
  'bottom-right': { bottom: '0', right: '0' },
};

// 生成ZStack容器样式
export const generateZStackStyles = (props: ZStackProps) => {
  return css`
    ${generateCompleteCSS(props, 'zstack')}

    /* ZStack特定样式 */
    position: relative;

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

  /* 根据alignment属性定位 */
  ${({ alignment = 'top-left' }) => {
    const alignmentStyles = childAlignmentMap[alignment] || childAlignmentMap['top-left'];
    return css`
      ${alignmentStyles.top !== undefined ? css`top: ${alignmentStyles.top};` : ''}
      ${alignmentStyles.right !== undefined ? css`right: ${alignmentStyles.right};` : ''}
      ${alignmentStyles.bottom !== undefined ? css`bottom: ${alignmentStyles.bottom};` : ''}
      ${alignmentStyles.left !== undefined ? css`left: ${alignmentStyles.left};` : ''}
      ${alignmentStyles.transform ? css`transform: ${alignmentStyles.transform};` : ''}
    `;
  }}
`;