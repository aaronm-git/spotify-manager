import { Container, Card } from "react-bootstrap";
const Dashboard = () => {
  return (
    <Container>
      <Card className="bg-dark text-light mt-2 shadow-lg">
        <Card.Body>
          <Card.Title className="fw-light border-bottom border-light">Dashboard</Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
