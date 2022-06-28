import { Fragment, useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { BsSpotify, BsFillGearFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import SpotifyContext from "../../context/spotify/spotifyContext";

const Header = () => {
  const spotifyContext = useContext(SpotifyContext);
  const { user } = spotifyContext;
  return (
    <Fragment>
      <Navbar bg="black" variant="dark">
        <Container className="position-relative">
          <Link to="/" className="mx-auto navbar-brand">
            <span className="fw-bold">SPOTIFY SHORTCUTS</span>
            <BsSpotify className="icon" />
          </Link>
        </Container>
      </Navbar>
      {user && (
        <div className="bg-primary py-2" variant="dark">
          <Container>
            <p className="text-end m-0">
              Logged in as: {user.display_name}
              <Link to="/settings" className="text-white">
                <BsFillGearFill className="icon" />
              </Link>
            </p>
          </Container>
        </div>
      )}
    </Fragment>
  );
};

export default Header;
