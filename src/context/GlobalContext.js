import { createContext, useReducer, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
const GlobalContext = createContext();

// const initialState = {
//     notification: {
//         type: "info",
//         message: ""
//     }
// }

export const GlobalState = ({ children }) => {
  const [alert, setAlert] = useState({ variant: "info", msg: "", icon: <FaInfoCircle />, show: false });
  const [loading, setLoading] = useState(false);
  const [loadingInfo, setLoadingInfo] = useState("");

  return (
    <GlobalContext.Provider value={{ alert, setAlert, loading, setLoading, loadingInfo, setLoadingInfo }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
