import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

declare module 'styled-components' {
  /* tslint:disable */
  export interface DefaultTheme extends Theme {}
}

export const GlobalStyles = createGlobalStyle`
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: inherit;
}* {
   box-sizing: border-box;
   padding: 0;
   margin: 0;
 }
html {
  font-size: 16px;
}
body {
  font-family: Poppins, sans-serif;
  min-height: 100vh;
  width: 100%;
  position: relative;
}
#root {
  width: 100%;
  height: 100%;
  margin: auto 0;
  padding: 0 1rem;
}
`;
