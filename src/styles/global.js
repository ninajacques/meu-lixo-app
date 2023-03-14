import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    width: 100vw;
    height: 100vh;
    background-color: white;
    font-family: Arial, Helvetica, sans-serif
  }

  #page {
    display: grid;
    grid-template-areas:
    'header header header header header header'
    'main main main main main main'
    'menu menu menu menu menu menu';

    @media only screen and (min-width: 768px) {
      grid-template-areas:
        'header header header header header header'
        'menu main main main main main';
    }
  }
`;

export default GlobalStyle;
