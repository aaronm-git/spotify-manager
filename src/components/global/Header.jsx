import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { BsSpotify, BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const Header = ({ userProfile }) => {
  return (
    <>
      <Navbar bg="black" variant="dark">
        <Container className="position-relative">
          <Link to="/" className="mx-auto navbar-brand">
            <span className="fw-bold">SPOTIFY MANAGER</span>
            <BsSpotify className="icon" />
          </Link>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
          {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> */}
        </Container>
      </Navbar>
      {userProfile ? (
        <Navbar bg="primary">
          <Container className="justify-content-end">
            <span>Logged in as:&nbsp;</span>
            <span>
              {userProfile.display_name}
              <Link to="/settings" className="text-white">
                <BsFillGearFill className="icon" />
              </Link>
            </span>
          </Container>
        </Navbar>
      ) : (
        ""
      )}
    </>
  );
};

export default Header;
