import styled, { css } from 'styled-components';
import { BoxTransientProps } from '../../types';
import { generateCompleteCSS } from '../../utils/cssMapper';
import { boxShouldForwardProp } from '../../../utils/propFilter';

// 生成动态样式
export const generateBoxStyles = (props: BoxTransientProps) => {
  // 将$前缀的props转换为普通props供CSS生成器使用
  const cssProps = {
    width: props.$width,
    height: props.$height,
    minWidth: props.$minWidth,
    maxWidth: props.$maxWidth,
    minHeight: props.$minHeight,
    maxHeight: props.$maxHeight,
    alignment: props.$alignment,
    gap: props.$gap,
    padding: props.$padding,
    overflow: props.$overflow,
    fill: props.$fill,
    strokeColor: props.$strokeColor,
    strokeWeight: props.$strokeWeight,
    strokeStyle: props.$strokeStyle,
    radius: props.$radius,
    opacity: props.$opacity,
    distribution: props.$distribution,
  };

  return css`
    ${generateCompleteCSS({ ...cssProps }, 'box')}

    /* 重置默认样式 */
    box-sizing: border-box;
    margin: 0;
  `;
};

// 基础Box样式组件
export const StyledBox = styled.div.withConfig({
  shouldForwardProp: boxShouldForwardProp,
})<BoxTransientProps>`
  ${({ ...props }) => generateBoxStyles(props)}
`;
