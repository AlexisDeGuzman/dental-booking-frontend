import { Navbar, Container, Nav } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import { useContext, useState } from 'react'

const AppNavBar = () => {

  //states
  const [expanded, setExpanded] = useState(false);

  const handleNavClick = () => {
    setExpanded(false);
  };

    return (
        <Navbar 
      expand="lg" 
      className='shadow'
      style={{
        background: 'linear-gradient(to right, #C55FFB, #EFDCF9)',
      }}
      fixed="top"
    >
        <Container fluid className='mx-3'>
        <Navbar.Brand as = {Link} to = '/' className='text-white fw-bold'>Chasing Perfection</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)}/>
        <Navbar.Collapse id="basic-navbar-nav" in={expanded}>
          <Nav className="ms-auto" onClick={handleNavClick}>
                   
            <Nav.Link 
              as = {NavLink} 
              to = '/'
              className="nav-link"
              activeclassname="active" 
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as = {NavLink} 
              to = '/appointments'
              className="nav-link"
              activeclassname="active"
            >
              Appointments
            </Nav.Link>
            
                <Nav.Link 
                  as = {NavLink} 
                  to = '/register'
                  className="nav-link"
                  activeclassname="active"
                >
                  Register
                </Nav.Link>
                <Nav.Link 
                  as = {NavLink} 
                  to = '/login'
                  className="nav-link"
                  activeclassname="active"
                >
                  Login
                </Nav.Link>

                <Nav.Link 
                  as = {NavLink} 
                  to = '/logout'
                  className="nav-link"
                  activeclassname="active"
                >
                  Logout
                </Nav.Link>
  
                
                <Nav.Link 
                  as={NavLink} 
                  to='/profile' 
                  className="d-flex align-items-center nav-link"
                  activeclassname="active"
                >
                  Profile
                </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default AppNavBar;