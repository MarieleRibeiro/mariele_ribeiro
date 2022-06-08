import styled, { css } from 'styled-components'

const Container = styled.footer`
    ${({ theme }) => css`
        background: ${theme.colors.gray600};
        padding: 25px;
        display: flex;
        width: 100%;
        justify-content: center;
        strong {
            color: ${theme.colors.white};
            font-size: 24px;
        }
    `}
`
const Content = styled.div`
    max-width: 980px;
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const Left = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
`
const SocialMedia = styled.div`
    display: flex;
    align-items: center;
    gap: 37px;
`

export const Footer = () => {
    return (
        <Container>
            <Content>
                <Left>
                    <strong>Contato</strong>
                    <strong>fulanodetal@teste.com.br</strong>
                </Left>
                <Right>
                    <strong>Nossas Redes Sociais</strong>
                    <SocialMedia></SocialMedia>
                </Right>
            </Content>
        </Container>
    )
}
