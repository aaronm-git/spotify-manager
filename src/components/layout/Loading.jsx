/** @jsxImportSource @emotion/react */
import { Fragment, useContext, useEffect } from "react";
import { css } from "@emotion/react";
import GlobalContext from "../../context/GlobalContext";
import { Spinner, Card } from "react-bootstrap";

const Loading = () => {
  const globalContext = useContext(GlobalContext);
  const { loading, loadingInfo, setLoadingInfo } = globalContext;

  useEffect(() => {
    if (loading === false) setLoadingInfo("");
  }, [loading]);

  return (
    <Card bg="dark" css={loadingStyle}>
      <Card.Body>
        <Spinner animation="border" role="status" variant="primary" />
        <span>Loading...</span>
        <small className="text-muted">{loadingInfo}</small>
      </Card.Body>
    </Card>
  );
};

const loadingStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 8rem;
  width: 18rem;

  .card-body {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  span {
    margin-left: 1rem;
  }

  small {
    flex-basis: 100%;
    position: absolute;
    bottom: 0.75rem;
  }
`;

export default Loading;
