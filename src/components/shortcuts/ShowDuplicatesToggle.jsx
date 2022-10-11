import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
// components
import ToggleButton from 'react-bootstrap/ToggleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

const toggleShowDuplicates = (data, setData) => {
	console.log(data[0]);
	const duplicates = data.filter((item, index) => {
		const exactDuplicate = data.indexOf(item) !== index;
		const duplicateIds = data.filter((item2) => item2.trackId === item.trackId).length > 1;
		// const duplicateName = data.filter((item2) => item2.trackName === item.trackName).length > 1;
		// const duplicateArtist = data.filter((item2) => item2.artistName === item.artistName).length > 1;
		// const duplicateAlbum = data.filter((item2) => item2.albumId === item.albumId).length > 1;
		const duplicateByNameAndArtistName =
			data.filter((item2) => item2.trackName === item.trackName && item2.artistName === item.artistName).length > 1;
		return exactDuplicate || duplicateIds || duplicateByNameAndArtistName;
	});
	setData(duplicates);
};

export default function ShowDuplicatesToggle({ data, setData }) {
	const [checked, setChecked] = useState(false);
	const queryClient = useQueryClient();
	const cachedLibrary = queryClient.getQueryData(['spotifySavedTracks']);

	useEffect(() => {
		if (checked) {
			toggleShowDuplicates(data, setData);
		} else {
			setData(cachedLibrary);
		}
	}, [checked]);

	return (
		<ToggleButton
			id="showDupsToggle"
			variant="outline-primary"
			type="checkbox"
			checked={checked}
			size="lg"
			title="Show Duplicates"
			value="1"
			onChange={() => setChecked(!checked)}
		>
			<FontAwesomeIcon icon={solid('clone')} />
			<span className="visually-hidden">Show Duplicates</span>
		</ToggleButton>
	);
}
