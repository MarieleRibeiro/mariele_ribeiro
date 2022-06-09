import styled, { css } from 'styled-components'
import { Button as AntdButton } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'

const StyledButton = styled(AntdButton)`
    ${({ theme }) => css`
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
        padding: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        border-radius: 4px;

        &:hover {
            background: ${theme.colors.primary};
            color: ${theme.colors.white};
            border-color: transparent;
        }
    `}
`

export const Button = ({ children, ...rest }: ButtonProps) => {
    return <StyledButton {...rest}>{children}</StyledButton>
}
