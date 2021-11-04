import { Container, Navbar } from "react-bootstrap";
import { BsSpotify, BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const Header = ({ userProfile, isAppAuthorized }) => {
  return (
    <>
      <Navbar bg="black" variant="dark">
        <Container className="position-relative">
          <Link to="/" className="mx-auto navbar-brand">
            <span className="fw-bold">SPOTIFY MANAGER</span>
            <BsSpotify className="icon" />
          </Link>
        </Container>
      </Navbar>
      {isAppAuthorized ? (
        <Navbar bg="primary">
          <Container className="justify-content-end">
            <span>Logged in as:&nbsp;</span>
            <span>
              {userProfile && userProfile.display_name}
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
