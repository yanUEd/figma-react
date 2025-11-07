import styled, { css } from 'styled-components';
import { RowTransientProps } from '../../types';
import { generateCompleteCSS } from '../../utils/cssMapper';
import { rowShouldForwardProp } from '../../../utils/propFilter';

// 生成Row样式
export const generateRowStyles = (props: RowTransientProps) => {
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
    ${generateCompleteCSS(cssProps, 'row')}

    /* Row特定样式 */
    flex-direction: row;
    ${props.$wrap === 'true' ? css`
      flex-wrap: wrap;
    ` : css`
      flex-wrap: nowrap;
    `}

    /* 重置默认样式 */
    box-sizing: border-box;
    margin: 0;
  `;
};

export const StyledRow = styled.div.withConfig({
  shouldForwardProp: rowShouldForwardProp,
})<RowTransientProps>`
  ${({ ...props }) => generateRowStyles(props)}
`;
