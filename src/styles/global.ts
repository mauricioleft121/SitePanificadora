import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
   margin: 0;
   padding: 0;
   outline: 0;
   box-sizing: border-box;
 }

 body {
   background: #f7f7f7;
   -webkit-font-smoothing: antialiased;
 }

 body, input, button, h1, p {
   font: 16px Lato, sans-serif;
 }

 #root {
}

  button {
    cursor: pointer;
  }

`;
