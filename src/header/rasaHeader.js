import Image from 'react-bootstrap/Image';
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function RasaHeader(props) {

  const navigate = useNavigate();
  const [searchString, setSearchString] = useState("");

  return (

    <Navbar bg="light" collapseOnSelect data-bs-theme="light" className='rasaheader'>
      <Container>
          <Navbar.Brand href="/rasa/home">RASA</Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" /> */}
          {props.isAuthenticated && props.loggedInUser.role == 1 && <Form className="d-flex" style={{flexGrow: 1}}>
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
                onChange={(e) => {
                  setSearchString(e.target.value)
                }}
              />
              <Button variant="outline-light" className="searchButton" style={{color: "black"}} onClick={() => {
                navigate("/rasa/search", {state: {"search": searchString}})
              }}><FontAwesomeIcon icon={faSearch} /></Button>
            </Form>}
        <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
          {props.isAuthenticated && 
            <Nav>
              {props.loggedInUser.role == 1 && <Nav.Link href="/rasa/browseproducts">Browse Products</Nav.Link>}
              {props.loggedInUser.role == 1 && <Nav.Link href="/rasa/cart">Cart</Nav.Link>}
              {props.loggedInUser.role == 1 && <Nav.Link href="/rasa/wishlist">Wishlist</Nav.Link>}
              {props.loggedInUser.role == 1 && <Nav.Link href="/rasa/orders">Orders</Nav.Link>}
              {props.loggedInUser.role == 1 && <Nav.Link href="/rasa/payments">Payments</Nav.Link>}
              {props.loggedInUser.role == 2 && <Nav.Link href="/rasa/products">Products</Nav.Link>}
              {props.loggedInUser.role == 2 && <Nav.Link href="/rasa/tags">Product Tags</Nav.Link>}
              {props.loggedInUser.role == 2 && <Nav.Link href="/rasa/users">Users</Nav.Link>}
              {props.loggedInUser.role == 2 && <Nav.Link href="/rasa/allorders">Orders</Nav.Link>}
              {props.loggedInUser.role == 2 && <Nav.Link href="/rasa/salesdashboard">Sales Dashboard</Nav.Link>}
              <NavDropdown title={props.loggedInUser.name && (
                      <>
                        <Navbar.Text>Hi, {props.loggedInUser.name}  </Navbar.Text>
                        <FontAwesomeIcon icon={faUserCircle} />
                      </>
                    )  
              } id="collapsible-nav-dropdown">
                {/* <NavDropdown.Item href="/rasa/profile">Profile</NavDropdown.Item> */}
                {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item onClick={props.logout}>Log out</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default RasaHeader;