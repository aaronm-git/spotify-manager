import { useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Spinner, Card } from "react-bootstrap";

const LoadingInfo = ({ info }) => {
  return <small className="d-block text-muted">{info}</small>;
};

const Loading = () => {
  const globalContext = useContext(GlobalContext);
  const { loading, loadingInfo, setLoadingInfo } = globalContext;

  useEffect(() => {
    if (loading === false) setLoadingInfo("");
  }, [loading]);

  return (
    <Card bg="dark" className="py-2">
      <Card.Body className="text-center">
        <Spinner className="d-block mx-auto mb-2" animation="border" role="status" variant="primary" />
        <span>Loading...</span>
        <LoadingInfo info={loadingInfo} />
      </Card.Body>
    </Card>
  );
};

export default Loading;
