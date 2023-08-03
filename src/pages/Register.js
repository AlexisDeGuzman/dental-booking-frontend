import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import Swal2 from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';

const Register = () => {
    // States
    const [ email, setEmail ] = useState('');
    const [ password1, setPassword1 ] = useState('');
    const [ password2, setPassword2 ] = useState('');
    const [ isPasswordMatch, setIsPasswordMatch ] = useState(false);
    const [ isDisabled, setIsDisabled ] = useState(false);
    const [ error, setError] = useState('');
    const [ isError, setIsError] = useState(false);
    
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