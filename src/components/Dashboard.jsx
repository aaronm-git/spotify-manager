import { useState, useMemo } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import TrackLibrary from "./TrackLibrary";
// import savedTracksData from "../3-tracks.json";
import savedTracksData from "../all-my-tracks.json";

const Dashboard = ({ getRefreshAccessToken }) => {
  const [isLoading, setIsLoading] = useState(false);

  // const getUserSavedTracks = useCallback(() => {
  //   (async () => {
  //     setIsLoading(true);
  //     try {
  //       let savedTracks = [];
  //       getRefreshAccessToken();
  //       let hasNext = true;
  //       let url = "https://api.spotify.com/v1/me/tracks?limit=50&market=US";
  //       while (hasNext) {
  //         const response = await axios.get(url, {
  //           headers: {
  //             authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //           },
  //         });
  //         savedTracks = [...savedTracks, ...response.data.items];
  //         if (response.data.next) url = response.data.next;
  //         else hasNext = false;
  //       }
  //       setSavedTracks(savedTracks);
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //     setIsLoading(false);
  //   })();
  // }, [getRefreshAccessToken, setSavedTracks]);

  // useEffect(() => {
  //   // getUserSavedTracks();
  // }, [getUserSavedTracks]);

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

  const data = useMemo(() => savedTracksData, []);

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
