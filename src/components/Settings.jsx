import { Container, Card, Button } from "react-bootstrap";
import { BsFillDoorClosedFill } from "react-icons/bs";

const handleLogOut = () => {
  window.localStorage.clear();
  window.location.href = "/authorize";
};

const Settings = () => {
  return (
    <Container className="mt-2">
      <Card className="bg-dark text-white">
        <Card.Body>
          <Card.Title className="fw-light border-bottom border-primary">Settings</Card.Title>
          <div className="text-end">
            <Button variant="outline-danger" onClick={handleLogOut}>
              Log Out <BsFillDoorClosedFill className="icon" />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Settings;
