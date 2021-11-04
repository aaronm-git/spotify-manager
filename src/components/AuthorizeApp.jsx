import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BsSpotify } from "react-icons/bs";

const Authenticate = ({ getAppAuthorization }) => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <Card className="bg-dark">
            <Card.Body>
              <Card.Title className="border-bottom border-primary">Authorization Required</Card.Title>
              <div className="text-center">
                <Button className="btn-lg" onClick={getAppAuthorization}>
                  Authorize App <BsSpotify className="icon" />
                </Button>
                <small className="text-muted d-block mt-2">
                  Please login using your Spotify account in order to use this app.
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Authenticate;
