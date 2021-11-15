import { useMemo } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import TrackLibrary from "./TrackLibrary";
// import savedTracksData from "../3-tracks.json";
// import savedTracksData from "../all-my-tracks.json";

const Dashboard = ({ savedTracksData, isLoading }) => {
  const data = useMemo(() => savedTracksData, [savedTracksData]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "track.name",
      },
      {
        Header: "Artist",
        accessor: "track.artists[0].name",
      },
      {
        Header: "Album",
        accessor: "track.album.name",
      },
    ],
    []
  );

  return (
    <Container fluid>
      <Card className="bg-dark text-white mt-2 shadow-lg">
        <Card.Body>
          <Card.Title className="fw-light border-bottom border-primary">Dashboard</Card.Title>
          <div>
            <h2 className="mb-2">Saved Tracks</h2>
            {isLoading ? (
              <Spinner animation="border" variant="primary" className="d-block mx-auto" />
            ) : (
              <TrackLibrary columns={columns} data={data} />
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
