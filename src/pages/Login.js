import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import Swal2 from 'sweetalert2';
import UserContext from '../UserContext';

const Login = () => {
    // States
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isDisabled, setIsDisabled ] = useState(true);
    const [ error, setError ] = useState(''); 
    const [ isError, setIsError ] = useState('');

    // Navigation
    const navigate = useNavigate();

    // User context
    const{ user, setUser } = useContext(UserContext);

    // Disable when fields are not filled
    useEffect(() => {
        if( email && password ) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [email,password])

    // Backend Api login
    function authenticate(e) {
    e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/users/login`,{
            method : 'POST',
            headers : { 'Content-Type' : 'application/json'},
            body : JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(res => {
            if (res.ok) {
                setIsError(false)
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
                    title: 'Login unsuccessful!',
                    icon: 'error',
                    text: 'Check your login credentials and try again'
                })
            } else {
                Swal2.fire({
                    title: 'Login successful!',
                    icon: 'success',
                    text: 'Welcome to my Shop!'
                })
                localStorage.setItem('token', data.access);
                getUserId(data.access);
                navigate('/products')
            }
        })
    }

    //Get user details
    const getUserId = token => {
        fetch(`${process.env.REACT_APP_API_URL}/users/userDetails`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            setUser({
              id: data._id,
              email: data.email,
              isAdmin: data.isAdmin
            })
        })
    }

    return (
        !user.id 
        ? 
        <Container>
        <Row className='mt-5 pt-3'>
            <Col xs={10} md={4} className = 'mt-5 py-5 rounded col-6 mx-auto bg-light' style={{backgroundImage: 'linear-gradient(to left, #C55FFB, #EFDCF9)'}}>
                <h1 className = 'py-3 text-center mt-2'>Login</h1>
                { isError && <Form.Text className="text-danger">{error}</Form.Text> }
                <Form onSubmit={(e) => authenticate(e)}>
                    <Form.Group controlId="userEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit" id="submitBtn" disabled = {isDisabled} className ='mt-3'>
                            Login
                        </Button>
                    
                </Form>
            </Col>
        </Row>
    </Container>

    :
    <Navigate to = '/*' />
    );
};

export default Login;