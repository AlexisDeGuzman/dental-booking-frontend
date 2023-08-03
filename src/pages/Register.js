import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import Swal2 from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

const Register = () => {
    // States
    const [ email, setEmail ] = useState('');
    const [ firstName, setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ contactNumber, setContactNumber ] = useState('');
    const [ password1, setPassword1 ] = useState('');
    const [ password2, setPassword2 ] = useState('');
    const [ isPasswordMatch, setIsPasswordMatch ] = useState(false);
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ error, setError] = useState('');
    const [ isError, setIsError] = useState(false);

    // Navigation
    const navigate = useNavigate();

    // Check if fields are filled
    useEffect(() => {
      if( email && password1 && password2 && (password1 === password2) ) {
        setIsDisabled(false);
      } else {
        setIsDisabled(true);
      }
    }, [ email, password1, password2 ])

    // Check password match
    useEffect (() => {
      if (password1 !== password2 ) {
        setIsPasswordMatch(false);
      } else {
        setIsPasswordMatch(true);
      }
    }, [ password1, password2 ])

    function registerUser(event) {
    event.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
          method : 'POST',
          headers : { 'Content-Type': 'application/json'},
          body : JSON.stringify({
            email: email,
            password: password1
          })
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            res.text().then((message) => {
              setIsError(true)
              setError(message);
            })
          }
        })
        .then(data => {
          if ( !data ) {
            Swal2.fire({
                title: "Register unsuccessful!",
                icon: 'error',
                text: 'Check your register credentials and try again'
            })
          } else {
            Swal2.fire({
                title: "Register successful!",
                icon: 'success',
                text: 'You may now Log In'
            })
            navigate('/login');
          }
        })
        .catch(err => {
          // returns from the promise res.text()
          err.then((errorMessage) => {
            setIsError(true)
            setError(errorMessage);
          })
        })
    };

    return (
        <Container>
      <Row className='mt-5 pt-3'>
        <Col xs={10} md={4} className = "mt-5 py-3 col-6 mx-auto bg-light rounded" style={{backgroundImage: 'linear-gradient(to left, #C55FFB, #EFDCF9)'}}>
          <h1 className = "py-3 text-center">Register</h1>
          <Form>
              
            { isError && <Form.Text className="text-danger">{error}</Form.Text> }

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email address" 
                value = {email}
                onChange = {event => setEmail(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter First Name" 
                value = {firstName}
                onChange = {event => setFirstName(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Last Name" 
                value = {lastName}
                onChange = {event => setLastName(event.target.value)}
                />
            </Form.Group> 

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Address" 
                value = {address}
                onChange = {event => setAddress(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formContactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter Contact Number" 
                value = {contactNumber}
                onChange = {event => setContactNumber(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Enter password" 
                value = {password1}
                onChange = {event => setPassword1(event.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Retype your nominated password" 
                value = {password2}
                onChange = {event => setPassword2(event.target.value)}
                />

              <Form.Text className="text-danger" hidden = {isPasswordMatch}>
                The passwords does not match!
              </Form.Text>
            </Form.Group>

            

            <Button variant="primary" type="submit" disabled = {isDisabled}>
              Sign up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    );
};

export default Register;