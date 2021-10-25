import { Container, Row, Col } from "react-bootstrap";
const Dashboard = () => {
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>Dashboard</Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
