import React from "react";
import { CSVLink } from "react-csv";
import { FaFileCsv } from "react-icons/fa";
import _ from "lodash";

const getCsvData = (savedTracksData) => {
  console.log(savedTracksData[0]);
  const csvData = [["Track Name", "Artist Name", "Album Name", "id", "Artist id", "Album id"]];
  _.forEach(savedTracksData, (data) => {
    const trackDetails = [
      data.trackName,
      data.artistName,
      data.albumName,
      data.id,
      data.trackData.artists[0].id,
      data.trackData.album.id,
    ];
    csvData.push(trackDetails);
  });
  return csvData;
};

const DownloadLibrary = ({ className, savedTracksData }) => {
  return (
    <CSVLink data={getCsvData(savedTracksData)} target="_blank" className={`${className} btn btn-light`}>
      Download to CSV
      <FaFileCsv className="icon" />
    </CSVLink>
  );
};

export default DownloadLibrary;
