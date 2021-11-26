/** @jsxImportSource @emotion/react */
import { useMemo } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import TrackLibrary from "./TrackLibrary";
import Shortcuts from "./Shortcuts";
import { css } from "@emotion/react";

const Dashboard = ({ savedTracksData, setSavedTracksData, isLoading }) => {
  const data = useMemo(() => savedTracksData, [savedTracksData]);

  const columns = useMemo(
    () => [
      {
        Header: "#",
        // accessor: (originalRow, rowIndex) => {
        //   return rowIndex + 1;
        // },
      },
      {
        Header: "Name",
        accessor: "trackName",
      },
      {
        Header: "Artist",
        accessor: "artistName",
      },
      {
        Header: "Album",
        accessor: "albumName",
      },
    ],
    []
  );

  return (
    <Container fluid>
      <Card className="bg-dark text-white mt-2 shadow-lg">
        <Card.Body
          css={css`
            section {
              margin-bottom: 2rem;
            }
          `}
        >
          <Card.Title className="fw-light border-bottom border-primary">Dashboard</Card.Title>
          <section>
            <h2 className="mb-2">Shortcuts</h2>
            <Shortcuts savedTracksData={savedTracksData} setSavedTracksData={setSavedTracksData} />
          </section>
          <section>
            <h2 className="mb-2">Saved Tracks</h2>
            {isLoading ? (
              <Spinner animation="border" variant="primary" className="d-block mx-auto" />
            ) : (
              <TrackLibrary columns={columns} data={data} />
            )}
          </section>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
