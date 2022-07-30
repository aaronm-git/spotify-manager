import { Fragment, useState, useContext } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import _ from "lodash";
// id: libraryData.track.id,
// trackName: libraryData.track.name,
// albumName: libraryData.track.album.name,
// artistName: libraryData.track.artists[0].name,
// trackUri: libraryData.track.uri,
// artistUri: libraryData.track.artists[0].uri,
// albumUri: libraryData.track.album.uri,
// trackData: libraryData.track,

function ShowDuplicates({ data }) {
  const [checked, setChecked] = useState(false);
  const findDups = () => {
    const notFiltered = data;
    if (checked) {
      data = _.uniqBy(data);
    } else data = notFiltered;
  };
  return (
    <Fragment>
      <ToggleButton
        id="showDupsToggle"
        variant="outline-primary"
        type="checkbox"
        checked={checked}
        value="1"
        onChange={(e) => {
          setChecked(e.currentTarget.checked);
          findDups();
        }}
      >
        Show Duplicates
      </ToggleButton>
    </Fragment>
  );
}

export default ShowDuplicates;
