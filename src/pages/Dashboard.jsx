import { Card } from "react-bootstrap";
import TrackLibrary from "../components/TrackLibrary";
const Dashboard = () => {
  return (
    <Card className="bg-dark text-white mt-2 shadow-lg">
      <Card.Body>
        <Card.Title className="fw-light border-bottom border-primary">Dashboard</Card.Title>
        <TrackLibrary />
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
