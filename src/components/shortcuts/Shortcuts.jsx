import React from "react";
import DeleteDuplicates from "./DeleteDuplicates";
import DownloadLibrary from "./DownloadLibrary";
import ShowDuplicates from "./ShowDuplicates";
const Shortcuts = (props) => {
  return (
    <div>
      {/* <DeleteDuplicates className="mx-2" /> */}
      {/* <DownloadLibrary /> */}
      <span className="d-block fw-light">Filters:</span>
      <ShowDuplicates {...props} />
    </div>
  );
};

export default Shortcuts;
