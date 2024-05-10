import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BACKEND_API_URL } from '../constants'
import React, { useState } from 'react';
import { setCookie } from '../utils/utils'
import Alert from 'react-bootstrap/Alert';
import { backendFetchUrl } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import ShowToast from '../components/Toast';

function RasaLogin({ login }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationAlert, setValidationAlert] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(email == "" || password == ""){
      setValidationAlert("One or more fields is empty");
      return;
    }

    await fetch(BACKEND_API_URL + '/api/v1/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ email, password }),
    }).then(response => response.json())
    .then(data => {
      if(data.status == 1){
        const token = data.auth.token;
        setCookie('rasatoken', token, 10); // set token in cookie
        if(data.auth.role == "ADMIN"){
          data.auth.role = 2;
        } else{
          data.auth.role = 1;
        }
        setValidationAlert("");
        login(data.auth);
      }else{
        setValidationAlert(data.errorMsg);
      }
    }).catch(e => {
      setValidationAlert(e);
    });
  };

  return (
    <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit" className="moredetailbtn rasabtn">
              Login
          </Button>
          <Button variant="primary" className="addbtn rasabtn" onClick={() => navigate("/rasa/signup")}>
              Create Account
          </Button>
        </Form>

        {validationAlert != "" && <ShowToast bg={"danger"} message={validationAlert} onHide={() => setValidationAlert("")}></ShowToast>}
    </Container>
  );
}

export default RasaLogin;
