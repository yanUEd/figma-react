import styled, { css } from 'styled-components';
import { ColumnProps } from '../../types';
import { generateCompleteCSS } from '../../utils/cssMapper';

// 生成Column样式
export const generateColumnStyles = (props: ColumnProps) => {
  return css`
    ${generateCompleteCSS({ ...props }, 'column')}

    /* Column特定样式 */
    flex-direction: column;

    /* 重置默认样式 */
    box-sizing: border-box;
    margin: 0;

    /* 自定义样式和className支持 */
    ${props.style ? css(props.style) : ''}
    ${props.className ? '' : ''}
  `;
};

export const StyledColumn = styled.div<ColumnProps>`
  ${({ ...props }) => generateColumnStyles(props)}
`;