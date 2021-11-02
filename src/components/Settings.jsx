import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Settings = ({ authorizeApp }) => {
  return (
    <Container className="mt-2">
      <Card className="bg-dark text-white">
        <Card.Body>
          <Card.Title className="fw-light border-bottom border-primary">Settings</Card.Title>
          <Row>
            <Col className="text-center">
              <Button size="lg" type="button" variant="outline-primary" onClick={authorizeApp}>
                Connect Spotify
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Settings;
