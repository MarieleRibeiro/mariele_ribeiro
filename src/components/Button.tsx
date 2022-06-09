import styled, { css } from 'styled-components'
import { Button as AntdButton } from 'antd'
import { ButtonProps } from 'antd/lib/button/button'

const StyledButton = styled(AntdButton)`
    ${({ theme }) => css`
        background: ${theme.colors.primary};
        color: ${theme.colors.white};
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
