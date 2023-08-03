import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserProvider } from './UserContext'

// import components and pages
import AppNavBar from './components/AppNavBar';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound';

function App() {
  
  return (
    <UserProvider>
        <Router>
          <AppNavBar />
          <Container fluid style={{ padding: '0' }}>
            <Routes>
              <Route exact path ='/' element = {<Home/>}/>
              <Route exact path ='/appointments' element = {<Appointments/>}/>
              <Route exact path ='/register' element = {<Register/>}/>
              <Route exact path ='/login' element = {<Login/>}/>
              <Route exact path ='/logout' element = {<Logout/>}/>
              <Route path = '*' element = {<NotFound />} />
            </Routes>
          </Container>
        </Router>
      </UserProvider>
  );
}

export default App;
