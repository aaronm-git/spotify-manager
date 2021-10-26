import { useState } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { BsCheckSquare } from "react-icons/bs";

const Settings = ({ isAuth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleConnectSpotify = () => {
    setIsLoading(true);
    const getAuthorizationUrl = "https://accounts.spotify.com/authorize";
    const scopes = [
      //Images
      "ugc-image-upload",
      //Playlists
      "playlist-modify-private",
      "playlist-read-private",
      "playlist-modify-public",
      "playlist-read-collaborative",
      //Users
      "user-read-private",
      "user-read-email",
      //Spotify Connect
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      //Library
      "user-library-modify",
      "user-library-read",
      //Listening History
      "user-read-playback-position",
      "user-read-recently-played",
      "user-top-read",
      //Playback
      "app-remote-control",
      "streaming",
      //Follow
      "user-follow-modify",
      "user-follow-read",
    ];
    let url = getAuthorizationUrl;
    url += "?client_id=" + process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    url += "&response_type=code";
    url += "&redirect_uri=http://localhost:3000/callback/";
    url += "&scope=" + scopes.join(" ");
    window.location.href = url;
    setIsLoading(false);
  };
  return (
    <Container className="mt-2">
      <Card className="bg-dark text-light">
        <Card.Body>
          <Card.Title className="fw-light border-bottom border-light">Settings</Card.Title>
          <Row>
            <Col className="text-center">
              <Button
                size="lg"
                type="button"
                variant="outline-success"
                onClick={handleConnectSpotify}
                disabled={isLoading || isAuth}
              >
                {isLoading ? <Spinner animation="grow" variant="success" /> : "Connect Spotify"}
              </Button>
              <small className="d-block text-muted" hidden={!isAuth}>
                Spotify Connected <BsCheckSquare />
              </small>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Settings;
