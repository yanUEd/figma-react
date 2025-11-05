import styled, { css } from 'styled-components';
import { ColumnTransientProps } from '../../types';
import { generateCompleteCSS } from '../../utils/cssMapper';

// 生成Column样式
export const generateColumnStyles = (props: ColumnTransientProps) => {
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
  };

  return css`
    ${generateCompleteCSS(cssProps, 'column')}

    /* Column特定样式 */
    flex-direction: column;

    /* 重置默认样式 */
    box-sizing: border-box;
    margin: 0;
  `;
};

export const StyledColumn = styled.div.withConfig({
  shouldForwardProp: (prop) => !prop.startsWith('$'),
})<ColumnTransientProps>`
  ${({ ...props }) => generateColumnStyles(props)}
`;
