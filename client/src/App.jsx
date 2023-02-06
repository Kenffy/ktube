import './global.css';
import styled, { ThemeProvider } from "styled-components";
import { useState } from 'react';
import { darkTheme, lightTheme } from './utils/Theme';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  return (

      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container darkMode={darkMode}>Hello World</Container>
      </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
height: 100vh;
width: 100%;
background-color: ${({ theme }) => theme.bg};
`;
