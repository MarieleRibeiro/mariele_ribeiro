import styled from 'styled-components'
import Logo from '../components/assets/logo.png'

const Container = styled.header`
    padding: 2rem;
    display: flex;
    align-items: center;
    width: 100%;

    @media (max-width: 920px) {
        padding: 1rem;
    }
`
const Image = styled.img`
    width: 215px;

    @media (max-width: 920px) {
        width: 100px;
    }
`
const Title = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    h1 {
        margin: 0;
    }

    @media (max-width: 475px) {
        display: none;
    }
`

export const Header = () => {
    return (
        <Container>
            <Image src={Logo} alt="logo" />
            <Title>
                <h1>Frontend Challenge</h1>
            </Title>
        </Container>
    )
}
