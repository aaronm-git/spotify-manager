import React from "react";
import DeleteDuplicates from "./shortcuts/DeleteDuplicates";
import DownloadLibrary from "./shortcuts/DownloadLibrary";

const Shortcuts = ({ savedTracksData, setSavedTracksData }) => {
  return (
    <>
      <DeleteDuplicates savedTracksData={savedTracksData} setSavedTracksData={setSavedTracksData} className="mx-2" />
      <DownloadLibrary savedTracksData={savedTracksData} />
    </>
  );
};

export default Shortcuts;
