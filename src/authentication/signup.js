import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BACKEND_API_URL } from "../constants";
import { Container, Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import ShowToast from "../components/Toast";


function SignUp(props){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [validationAlert, setValidationAlert] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if(email == "" || password == "" || firstname == "" || lastname == ""){
          setValidationAlert("One or more fields is empty");
          return;
        }

        let reqBody = {
            "firstName": firstname,
            "lastName": lastname,
            "email": email,
            "password": password,
        }
    
        await fetch(BACKEND_API_URL + '/api/v1/auth/register', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(reqBody),
        }).then(response => response.json())
        .then(data => {
          if(data.status == 1){
            navigate("/rasa/login")
          }
        }).catch(e => {
          console.log(e);
        });
      };


    return (
      <Container>
        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" value={lastname} onChange={(e) => setLastName(e.target.value)}/>
            </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Form.Group>
          <Button variant="primary" type="submit" className="addbtn rasabtn">
              Create Account
          </Button>
        </Form>

        {validationAlert != "" && <ShowToast bg={"danger"} message={validationAlert} onHide={() => setValidationAlert("")}></ShowToast>}
        </Container>
    )
}

export default SignUp;