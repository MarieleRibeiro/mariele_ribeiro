import { createGlobalStyle } from 'styled-components'
import { theme } from './colors'

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Inter, sans-serif;
  }

  h1 {
    font-size: 54px;
    color: ${theme.colors.gray600};
    @media (max-width: 920px) {
      font-size: 32px;
    }
  }

  p {
    font-size: 24px;
    color: ${theme.colors.black};

    @media (max-width: 920px) {
      font-size: 16px;
    }
  }


  h4 {
    font-size: 24px;

    @media (max-width: 920px) {
      font-size: 18px;
    }
  }


`
