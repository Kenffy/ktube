import './global.css';
import styled, { ThemeProvider } from "styled-components";
import { useState } from 'react';
import { darkTheme, lightTheme } from './utils/Theme';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Single from './pages/Single';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Register from './pages/Register';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(false);
  return (

      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <Container darkMode={darkMode}>
          <BrowserRouter>
            {/* <Menu darkMode={darkMode} setDarkMode={setDarkMode} /> */}
            <Main>
              <Navbar />
              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home type="random" />} />
                    <Route path="trends" element={<Home type="trend" />} />
                    <Route path="subscriptions" element={<Home type="sub" />} />
                    {/* <Route path="search" element={<Search />} /> */}
                    <Route
                      path="login"
                      element={user? <Home /> : <Login />}
                    />
                    <Route
                      path="register"
                      element={user? <Home /> : <Register />}
                    />
                    <Route path="video">
                      <Route path=":id" element={<Single />} />
                    </Route>
                  </Route>
                </Routes>
              </Wrapper>
            </Main>
          </BrowserRouter>
        </Container>
      </ThemeProvider>
  );
}

export default App;

const Container = styled.div`
height: 100vh;
width: 100%;
background-color: ${({ theme }) => theme.bg};
`;

const Main = styled.div`
  flex: 7;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;