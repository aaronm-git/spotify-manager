import React from "react";
import { Button } from "react-bootstrap";
import { BsFileMinusFill } from "react-icons/bs";
import _, { find } from "lodash";
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
    const dupsById = _(savedTracksData)
      .groupBy("id")
      .filter((x) => x.length > 1)
      .map((x) => ({
        ...x,
        numOfDuplicates: x.length,
      }))
      .value();
    // const dupsByArtistName = savedTracksData
    //   .filter((currentVal) => {
    //     return _.some(savedTracksData, (item) => {
    //       return (
    //         item.track.album.name !== currentVal.track.album.name &&
    //         item.track.artists[0].name === currentVal.track.artists[0].name &&
    //         item.track.name === currentVal.track.name &&
    //         _.includes(dupsById, (data) => item.track.id !== data.id)
    //       );
    //     });
    //   })
    //   .map((x) => ({
    //     id: x.track.id,
    //     name: x.track.name,
    //     artist: x.track.artists[0].name,
    //     album: x.track.album.name,
    //     numOfDuplicates: 2,
    //   }));
    // console.log(dupsByArtistName);
    // const duplicates = _.concat(dupsById, dupsByArtistName);
    const duplicates = dupsById;

    const chunkedIds = _(duplicates)
      .flatMap((dups) => {
        console.log(dups);
        const flatArr = [];
        for (let i = 1; i < dups.numOfDuplicates; i++) {
          flatArr.push(dups[i].id);
        }
        return flatArr;
      })
      .chunk(50)
      .value();

    console.log(chunkedIds);
    let removedDups = [...savedTracksData];
    chunkedIds.forEach((idChunk) => {
      let params = "?ids=" + _.toString(idChunk);
      idChunk.forEach((id) => {
        const index = _.findIndex(removedDups, (data) => data.id === id);
        console.log("removed: ", removedDups[index].trackName);
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
