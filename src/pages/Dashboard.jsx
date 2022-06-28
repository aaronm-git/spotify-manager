/** @jsxImportSource @emotion/react */
import { useMemo, useEffect, useContext } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
// import TrackLibrary from "./TrackLibrary";
import Shortcuts from "../components/shortcuts/Shortcuts";
import { css } from "@emotion/react";
import SpotifyContext from "../context/spotify/spotifyContext";

const Dashboard = () => {
  const spotifyContext = useContext(SpotifyContext);
  // console.log(spotifyContext);
  useEffect(() => {
    // spotifyContext.getUserSavedTracks();
  }, []);

  // const data = useMemo(() => spotifyContext.state.savedTracks, [spotifyContext.state.savedTracks]);
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "#",
  //     },
  //     {
  //       Header: "Name",
  //       accessor: "trackName",
  //     },
  //     {
  //       Header: "Artist",
  //       accessor: "artistName",
  //     },
  //     {
  //       Header: "Album",
  //       accessor: "albumName",
  //     },
  //   ],
  //   []
  // );

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
          {/* <TrackLibrary data={data} columns={columns} /> */}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;
