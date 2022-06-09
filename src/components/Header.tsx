import styled, { css } from 'styled-components'
import Logo from '../components/assets/logo.png'
const Container = styled.header`
    ${({ theme }) => css`
        padding: 35px;
        display: flex;
        align-items: center;
        width: 100%;
    `}
`
const Image = styled.div`
    width: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`
const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const Header = () => {
    return (
        <Container>
            <Image>
                <img src={Logo} alt="logo" />
            </Image>
            <Title>
                <h1>Frontend Challenge</h1>
            </Title>
        </Container>
    )
}
