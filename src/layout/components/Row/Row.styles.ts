import styled, { css } from 'styled-components';
import { RowProps } from '../../types';
import { generateCompleteCSS } from '../../utils/cssMapper';

// 生成Row样式
export const generateRowStyles = (props: RowProps) => {
  const { wrap, ...otherProps } = props;

  return css`
    ${generateCompleteCSS(otherProps, 'row')}

    /* Row特定样式 */
    flex-direction: row;
    ${wrap === 'true' ? css`
      flex-wrap: wrap;
    ` : css`
      flex-wrap: nowrap;
    `}

    /* 重置默认样式 */
    box-sizing: border-box;
    margin: 0;

    /* 自定义样式和className支持 */
    ${props.style ? css(props.style) : ''}
    ${props.className ? '' : ''}
  `;
};

export const StyledRow = styled.div<RowProps>`
  ${({ ...props }) => generateRowStyles(props)}
`;