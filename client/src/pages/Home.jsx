import styled from "styled-components";

export default function Home() {
  return (
    <Container>
      <HomeWrapper>
        Home
      </HomeWrapper>
    </Container>
  )
};

const Container = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
align-items: center;
justify-content: center;
background-color: var(--orange);
`;

const HomeWrapper = styled.div`
width: 1680px;
min-height: 100vh;
background-color: var(--white);
`;

