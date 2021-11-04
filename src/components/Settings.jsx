import { Container, Card } from "react-bootstrap";

const Settings = () => {
  return (
    <Container className="mt-2">
      <Card className="bg-dark text-white">
        <Card.Body>
          <Card.Title className="fw-light border-bottom border-primary">Settings</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Settings;
