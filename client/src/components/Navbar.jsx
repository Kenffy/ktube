import styled from "styled-components";
import KTLogo from '../assets/images/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Container>
      <NavWrapper>

        <NavLeft>
          <Bars />
          <Link to='/' style={{textDecoration: 'none'}}>
            <LogoWrapper>
              <LogoIcon src={KTLogo} alt='ktube logo'/>
              <Logo>tube</Logo>
            </LogoWrapper>
          </Link>
          
        </NavLeft>

        <NavCenter>
          <SearchWrapper>
            <SearchInput placeholder="Search..."/>
            <InputIcon />
          </SearchWrapper>
        </NavCenter>

        <NavRight>
          <NavActions>
            <Link to='/login' style={{textDecoration: 'none'}}>
              <NavButton>Sign In</NavButton>
            </Link>
            <Link to='/register' style={{textDecoration: 'none'}}>
              <NavButton active={true}>Sign Up</NavButton>
            </Link>
          </NavActions>
        </NavRight>

      </NavWrapper>
    </Container>
  )
};

const Container = styled.div`
width: 100%;
height: 70px;
background-color: ${(props)=> props.dark? 'var(--black)':'var(--white)' };
box-shadow: var(--box-shadow);
position: sticky;
top: 0;
display: flex;
align-items: center;
justify-content: center;
z-index: 10;
`;

const NavWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 2rem;
width: 100%;
`;

const NavLeft = styled.div`
display: flex;
align-items: center;
`;

const Bars = styled(MenuIcon)`
cursor: pointer;
height: 35px !important;
width: 35px !important;
color: var(--black-4) !important;
margin-right: 2rem;
`;

const LogoWrapper = styled.div`
display: flex;
align-items: center;
color: var(--black-4);
`;

const LogoIcon = styled.img`
height: 25px;
width: 25px;
cursor: pointer;
`;

const Logo = styled.span`
font-size: var(--size-l);
font-weight: 500;
`;


const NavCenter = styled.div`
width: 50%;
display: flex;
align-items: center;
justify-content: center;
`;

const SearchWrapper = styled.div`
border: var(--border);
display: flex;
align-items: center;
justify-content: space-between;
width: 80%;
padding: 0.3rem 0.5rem;
border-radius: var(--bdr-m);
`;

const SearchInput = styled.input`
width: 100%;
padding: 0rem 0.5rem;
margin: 0 0.2rem;
outline: none;
border: none;
font-size: var(--size-s);
background-color: transparent;
`;

const InputIcon = styled(SearchIcon)`
height: 22px !important;
width: 22px !important;
`;

const NavRight = styled.div`

`;

const NavActions = styled.div`
display: flex;
align-items: center;
`;

const NavButton = styled.button`
background-color: transparent;
outline: none;
border: ${props => props.active? '2px solid var(--orange)': 'none'};
cursor: pointer;
font-size: var(--size-sx);
font-weight: 500;
color: var(--black-4);
padding: 0.4rem 0.8rem;
border-radius: var(--bdr-m);
margin-left: 0.5rem;
&:hover{
  transition: all 0.3s;
  background-color: rgba(0,0,0,0.05);
}
`;