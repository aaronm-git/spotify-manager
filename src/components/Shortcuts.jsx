import React from "react";
import DeleteDuplicates from "./shortcuts/DeleteDuplicates";

const Shortcuts = ({ savedTracksData, setSavedTracksData }) => {
  return <DeleteDuplicates savedTracksData={savedTracksData} setSavedTracksData={setSavedTracksData} />;
};

export default Shortcuts;
