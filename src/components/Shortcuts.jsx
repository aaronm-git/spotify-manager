import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { BsFileMinusFill } from "react-icons/bs";
import _ from "lodash";
import axios from "axios";

const loadingSpinner = <Spinner animation="border" size="sm" />;

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
  const [loading, setLoading] = useState([false, ""]);

  const handleDeleteDuplicates = () => {
    setLoading([true, "handleDeleteDuplicates"]);
    const dupsById = _(savedTracksData)
      .groupBy("id")
      .filter((x) => x.length > 1)
      .map((x) => ({ ...x[0], numOfDuplicates: x.length }))
      .value();

    let dupsByArtistName = _(savedTracksData)
      .filter((track) => !_.includes(dupsById, (dup) => dup.id === track.id))
      .reduce((acc, curr) => {
        const checkIfAlreadyExist = () => {
          return !_.some(savedTracksData, (data) => {
            return (
              data.albumName !== curr.albumName &&
              data.artistName === curr.artistName &&
              data.trackName === curr.trackName
            );
          });
        };

        if (checkIfAlreadyExist(curr)) {
          return acc;
        } else {
          return [...acc, curr];
        }
      }, [])
      .reduce((acc, curr, i, array) => {
        const dups = _.filter(
          array,
          (data) => data.artistName === curr.artistName && data.trackName === curr.trackName
        );

        dups.forEach((dup) => {
          dup.dupId = i;
        });

        const numOfDuplicates = dups.length;

        curr.numOfDuplicates = numOfDuplicates;

        if (_.some(acc, (a) => a.dupId === curr.dupId)) {
          return acc;
        } else return [...acc, curr];
      }, []);

    const duplicates = _.concat(dupsById, dupsByArtistName);

    const chunkedIds = _(duplicates)
      .flatMap((dup) => {
        const numOfDuplicates = [];
        for (let i = 1; i < dup.numOfDuplicates; i++) {
          numOfDuplicates.push(dup.id);
        }
        return numOfDuplicates;
      })
      .chunk(50)
      .value();

    let removedDups = [...savedTracksData];
    chunkedIds.forEach((idChunk) => {
      let params = "?ids=" + _.toString(idChunk);
      removeTracksForCurrentUser(params); // Send Delete requests

      idChunk.forEach((id) => {
        removedDups = _(removedDups)
          .remove((data) => data.id !== id)
          .value();
        //   const index = _.findIndex(removedDups, (data) => data.id === id);
        //   removedDups.splice(index, 1);
      });
    });
    setSavedTracksData(removedDups);
    console.log("Delete Completed!");
    setLoading([false, ""]);
  };

  return (
    <Button variant="danger" onClick={handleDeleteDuplicates} disabled={loading[0]}>
      {loading[0] && loading[1] === "handleDeleteDuplicates" && loadingSpinner} Delete Duplicates
      <BsFileMinusFill className="icon" />
    </Button>
  );
};

export default Shortcuts;
