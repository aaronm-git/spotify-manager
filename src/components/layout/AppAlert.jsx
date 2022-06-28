/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from "react";
import GlobalContext from "../../context/GlobalContext";
import { Alert } from "react-bootstrap";
import { css } from "@emotion/react";

const AppAlert = () => {
  const globalContext = useContext(GlobalContext);
  const { alert, setAlert } = globalContext;
  useEffect(() => {
    setInterval(() => {
      setAlert({ ...alert, show: false });
    }, 5000);
  }, [alert]);

  return (
    <div css={alertStyle}>
      <Alert variant={alert.variant} show={alert.show}>
        {alert.icon} {alert.msg}
      </Alert>
    </div>
  );
};

const alertStyle = css`
  color: yellow;
  position: absolute;
  bottom: 0rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 800px;
`;

export default AppAlert;
