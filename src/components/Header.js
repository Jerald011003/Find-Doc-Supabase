import React, { useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout, getUserDetails } from "../actions/userActions";
import { useDispatch, useSelector } from 'react-redux';
import "./styles.css";
import '../output.css';

function Header() {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  const userDetails = useSelector(state => state.userDetails);
  const { user } = userDetails; 

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails('profile'));
    }
  }, [dispatch, userInfo]);

  const getDisplayName = (email) => {
    if (email) {
      return email.split('@')[0]; 
    }
    return "";
  };

  const displayName = userInfo?.name || (user && user.name) || getDisplayName(userInfo?.email) || "";

  return (
    <Navbar bg="light" variant="light" expand="lg" className="navbar">
      <Container className="justify-content-between">
        <LinkContainer to="/">
          <Navbar.Brand style={{ height: '0', padding: 0 }}>
            <img
              src="/images/finddoclogo.png"
              alt="Find Doc Logo"
              className="d-inline-block align-top"
              style={{ maxWidth: 'auto', height: 'auto', padding: 0, marginBottom: '8px' }}
            />
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="mr-auto">
            {userInfo || (user && user.name) ? ( // Check if userInfo or user.name is available
              <>
                <Form inline className="mx-3 d-flex align-items-center">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{
                      width: '180px',
                      borderRadius: '20px 0 0 20px',
                    }}
                  />
                  <Button
                    variant="dark"
                    style={{
                      borderRadius: '0 20px 20px 0',
                      marginLeft: '0'
                    }}
                  >
                    <i className="fas fa-search" style={{ color: 'white' }}></i>
                  </Button>
                </Form>
                <LinkContainer to="/">
                  <Nav.Link className="mx-1 fw-semibold">Doctors</Nav.Link>
                </LinkContainer>

                <LinkContainer to="/allproduct">
                  <Nav.Link className="mx-1 fw-semibold">
                    Medicines
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/appointments">
                  <Nav.Link className="mx-1 fw-semibold">
                    Appointments
                  </Nav.Link>
                </LinkContainer>
              </>
            ) : null}
          </Nav>

          <Nav className="ml-auto mx-1">
            {userInfo || (user && user.name) ? (
              <>
                <LinkContainer to="/cart">
                  <Nav.Link className="mx-1 fw-semibold">
                    <i className="fas fa-cart-arrow-down"></i>
                    Cart</Nav.Link>
                </LinkContainer>
                <NavDropdown title={displayName} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link className="mx-1 fw-semibold"><i className="fas fa-user"></i> Login</Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
