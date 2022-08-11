import { Fragment, useState, useEffect } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import _ from "lodash";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used

// id: libraryData.track.id,
// trackName: libraryData.track.name,
// albumName: libraryData.track.album.name,
// artistName: libraryData.track.artists[0].name,
// trackUri: libraryData.track.uri,
// artistUri: libraryData.track.artists[0].uri,
// albumUri: libraryData.track.album.uri,
// trackData: libraryData.track,

function ShowDuplicates({ useFilters, setShowDuplicatesFilter }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (checked) {
      setShowDuplicatesFilter(true);
    }
    // eslint-disable-next-line
  }, [checked]);

  return (
    <Fragment>
      <ToggleButton
        id="showDupsToggle"
        variant="outline-primary"
        type="checkbox"
        checked={checked}
        size="lg"
        title="Show Duplicates"
        value="1"
        onChange={(e) => {
          setChecked(e.currentTarget.checked);
        }}
      >
        <FontAwesomeIcon icon={solid("clone")} />
        <span className="visually-hidden">Show Duplicates</span>
      </ToggleButton>
    </Fragment>
  );
}

export default ShowDuplicates;
