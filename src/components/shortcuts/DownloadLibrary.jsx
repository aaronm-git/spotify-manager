import React from 'react';
// components
import { CSVLink } from 'react-csv';
// components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

const getCsvData = (data) => {
	const csvData = [['Track Name', 'Artist Name', 'Album Name', 'id', 'Artist id', 'Album id']];
	data.forEach((track) => {
		const trackDetails = [
			track.trackName,
			track.artistName,
			track.albumName,
			track.trackId,
			track.trackData.artists[0].id,
			track.trackData.album.id,
		];
		csvData.push(trackDetails);
	});
	return csvData;
};

export default function DownloadLibrary({ data }) {
	return (
		<CSVLink data={getCsvData(data)} className="btn btn-light btn-lg">
			<FontAwesomeIcon icon={solid('download')} />
			<span className="mx-2">Download to CSV</span>
		</CSVLink>
	);
}
