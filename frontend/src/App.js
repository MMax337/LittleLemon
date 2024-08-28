import './App.css';
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer'
import Main from './components/Main';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuthStatus } from './features/auth/authActions';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, []);

  return (
    <>
    <Nav className="top-nav"></Nav>
    <Main></Main>
    <Footer></Footer>
    </>
  );
}

export default App;
