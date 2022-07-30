import React from "react";
import DeleteDuplicates from "./DeleteDuplicates";
import DownloadLibrary from "./DownloadLibrary";
import ShowDuplicates from "./ShowDuplicates";
const Shortcuts = ({ data }) => {
  return (
    <div className="p-2">
      {/* <DeleteDuplicates className="mx-2" /> */}
      {/* <DownloadLibrary /> */}
      <ShowDuplicates data={data} />
    </div>
  );
};

export default Shortcuts;
