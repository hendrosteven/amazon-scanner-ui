import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

// eslint-disable-next-line react/prop-types
const Header = () => {
  const { userContext } = useContext(AppContext);
  const [user, setUser] = userContext;

  const handleLogout = () => {
    console.log("LOGOUT");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Navbar
      expand="lg"
      bg="primary"
      data-bs-theme="dark"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="#home">Amazon Scanner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/products">
              <Nav.Link>Products</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/add">
              <Nav.Link>Add Product</Nav.Link>
            </LinkContainer>
          </Nav>
          {user ? (
            // eslint-disable-next-line react/prop-types
            <NavDropdown title={user?.user?.email} style={{ color: "white" }}>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to="/signin" style={{ color: "white" }}>
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
