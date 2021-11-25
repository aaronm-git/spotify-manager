import React from "react";
import { Button } from "react-bootstrap";
import { BsFileMinusFill } from "react-icons/bs";
import _, { filter, find, forEach } from "lodash";
import axios from "axios";

const removeTracksForCurrentUser = async (params) => {
  console.log("delete Request started");
  try {
    await axios.delete("https://api.spotify.com/v1/me/tracks" + params, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
  } catch (error) {
    console.error(error.message);
  }
};

const Shortcuts = ({ savedTracksData, setSavedTracksData }) => {
  const handleDeleteDuplicates = () => {
    const duplicates = _(savedTracksData)
      .groupBy("track.id")
      .filter((x) => x.length > 1)
      .map((x) => ({
        id: x[0].track.id,
        name: x[0].track.name,
        artist: x[0].track.artists[0].name,
        album: x[0].track.album.name,
        numOfDuplicates: x.length,
      }))
      .value();

    const chunkedIds = _(duplicates)
      .flatMap((track) => {
        const dupes = [];
        for (let i = 1; i < track.numOfDuplicates; i++) {
          dupes.push(track.id);
        }
        return dupes;
      })
      .chunk(50)
      .value();
    let removedDups = [...savedTracksData];
    chunkedIds.forEach((idChunk) => {
      let params = "?ids=" + _.toString(idChunk);
      idChunk.forEach((id) => {
        const index = _.findIndex(removedDups, (data) => data.track.id === id);
        console.log("removed: ", removedDups[index].track.name);
        removedDups.splice(index, 1);
      });
      try {
        // removeTracksForCurrentUser(params);
      } catch (error) {
        console.log(error);
      }
    });
    setSavedTracksData(removedDups);
    console.log("Delete Completed!");
  };
  return (
    <Button variant="warning" onClick={handleDeleteDuplicates}>
      Delete Duplicates
      <BsFileMinusFill className="icon" />
    </Button>
  );
};

export default Shortcuts;
