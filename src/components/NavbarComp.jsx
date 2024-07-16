import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavbarComp() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary position-fixed top-0 w-100 z-3"
    >
      <Container className="bg-light-subtle">
        <Navbar.Brand href="#home">
          <img
            src="https://daisy.org/wp-content/uploads/2020/07/apple-books-app-icon.png"
            alt="Logo"
            height={40}
            width={40}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto p-2">
            <Nav.Link href="#home" className="fw-bolder align-self-center">
              Books
            </Nav.Link>
            <Nav.Link href="#favorites" className="fw-bolder align-self-center">
              Favorites
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;
