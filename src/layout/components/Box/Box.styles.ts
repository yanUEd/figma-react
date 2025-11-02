import styled, { css } from 'styled-components';
import { BoxProps } from '../../types';
import { generateCompleteCSS } from '../../utils/cssMapper';

// 生成动态样式
export const generateBoxStyles = (props: BoxProps) => {
  return css`
    ${generateCompleteCSS({ ...props }, 'box')}

    /* 重置默认样式 */
    box-sizing: border-box;
    margin: 0;

    /* 自定义样式和className支持 */
    ${props.style ? css(props.style as any) : ''}
    ${props.className ? '' : ''}
  `;
};

// 基础Box样式组件
export const StyledBox = styled.div<BoxProps>`
  ${({ ...props }) => generateBoxStyles(props)}
`;
