/** @jsxImportSource @emotion/react */

import { useState, useMemo, Fragment } from 'react';
import { Row, Col, Table, Pagination, Form, ButtonGroup, ToggleButton, Button, Spinner } from 'react-bootstrap';
import { useTable, useSortBy, usePagination, useGlobalFilter, useAsyncDebounce, useFilters } from 'react-table';
import { css } from '@emotion/react';
import Loading from './layout/Loading';
import { COLUMNS } from './react-table/spotifyColumns';
import _ from 'lodash';

import { getUserSavedTracks } from '../api/spotify';

import { useQuery, QueryClient, useMutation } from '@tanstack/react-query';

// const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
// 	const [value, setValue] = useState(globalFilter);
// 	const onChange = useAsyncDebounce((value) => {
// 		setGlobalFilter(value || undefined);
// 	}, 500);

// 	return (
// 		<Row>
// 			<Col lg="3">
// 				<Form.Control
// 					value={value || ''}
// 					type="text"
// 					placeholder="Search..."
// 					className="my-2"
// 					onChange={(e) => {
// 						setValue(e.target.value);
// 						onChange(e.target.value);
// 					}}
// 				/>
// 			</Col>
// 		</Row>
// 	);
// };

const TrackLibrary = () => {
	// const [toggleDuplicateChecked, setToggleDuplicateChecked] = useState(false);
	// const [savedTracks, setSavedTracks] = useState([]);
	// Queries
	const {
		data: useQueryData,
		isLoading,
		isError,
		error,
	} = useQuery(['spotify-savedTracks'], getUserSavedTracks, {
		staleTime: 1000 /* Milliseconds */ * 60 /* Seconds */ * 60 /* Minutes */ * 1 /* Hours */,
		refetchOnWindowFocus: false,
		onError: (error) => console.log(error),
	});

	const data = useMemo(() => useQueryData || [], [useQueryData]);

	const columns = useMemo(() => COLUMNS, []);

	// const toggleShowDuplicates = () => {
	// 	if (toggleDuplicateChecked) {
	// 		const duplicates = data.filter((item, index) => {
	// 			const exactDuplicate = data.indexOf(item) !== index;
	// 			const duplicateIds = data.filter((item2) => item2.trackId === item.trackId).length > 1;
	// 			// const duplicateName = data.filter((item2) => item2.trackName === item.trackName).length > 1;
	// 			// const duplicateArtist = data.filter((item2) => item2.artistId === item.artistId).length > 1;
	// 			// const duplicateAlbum = data.filter((item2) => item2.albumId === item.albumId).length > 1;
	// 			return exactDuplicate || duplicateIds;
	// 		});
	// 		setSavedTracks(duplicates);
	// 	} else {
	// 		setSavedTracks(useQueryData);
	// 	}
	// };

	// const {
	// 	mutate: addSpotifySongs,
	// 	isLoading: isAddSpotifySongsLoading,
	// 	data: addSpotifySongsData,
	// } = useMutation(addTracks, {
	// 	onSuccess: () => {
	// 		queryClient.invalidateQueries('spotify-savedTracks');
	// 	},
	// });

	// const DeleteDuplicatesButton = () => {
	// 	const {
	// 		mutateAsync: deleteSpotifySongs,
	// 		isLoading: isDeleteSpotifySongsLoading,
	// 		isError: isDeleteSpotifySongsError,
	// 		error: deleteSpotifySongsError,
	// 		isSuccess: isDeleteSpotifySongsSuccess,
	// 	} = useMutation(deleteTracks, {
	// 		onSuccess: () => queryClient.invalidateQueries('spotify-savedTracks'),
	// 	});

	// 	const handleDelete = async () => {
	// 		try {
	// 			const answer = window.confirm('Delete duplicates?');
	// 			if (answer) {
	// 				const uniqueIds = [...new Set(data.map((item) => item.trackId))];
	// 				const uniqueIdsChunks = _.chunk(uniqueIds, 50);
	// 				for (const chunk of uniqueIdsChunks) {
	// 					console.log(chunk);
	// 					await deleteSpotifySongs(chunk);
	// 					// if (isDeleteSpotifySongsSuccess) addSpotifySongs(chunk);
	// 				}
	// 				const filteredLibrary = useQueryData.filter((item, index) => {
	// 					const duplicateIds = useQueryData.filter((item2) => item2.trackId === item.trackId).length > 1;
	// 					return !duplicateIds;
	// 				});
	// 				queryClient.setQueryData(['spotify-savedTracks'], filteredLibrary);
	// 				setSavedTracks(filteredLibrary);
	// 				setToggleDuplicateChecked(false);
	// 			}
	// 		} catch (error) {
	// 			console.error(error);
	// 		}
	// 	};

	// 	return (
	// 		<Button onClick={handleDelete} disabled={isLoading} className="mx-3" variant="outline-danger">
	// 			{isLoading ? (
	// 				<>
	// 					Deleting... <Spinner animation="border" size="sm" variant="light" />
	// 				</>
	// 			) : (
	// 				'Delete Duplicates'
	// 			)}
	// 		</Button>
	// 	);
	// };

	const {
		getTableProps,
		headerGroups,
		page,
		prepareRow,
		state,
		setGlobalFilter,
		rows,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		preGlobalFilteredRows,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { hiddenColumns: ['trackId', 'artistId', 'albumId'] },
		},
		useGlobalFilter,
		useFilters,
		useSortBy,
		usePagination
	);

	if (isLoading) {
		return <Loading />;
	} else if (isError) {
		return <div>Error: {error.message}</div>;
	} else
		return (
			<Fragment>
				{/* <ButtonGroup>
					<ToggleButton
						id="toggle-check"
						type="checkbox"
						variant="outline-primary"
						checked={toggleDuplicateChecked}
						value="1"
						onClick={() => setToggleDuplicateChecked(!toggleDuplicateChecked)}
						onChange={() => toggleShowDuplicates()}
					>
						Show Duplicates
					</ToggleButton>
				</ButtonGroup>
				{toggleDuplicateChecked && <DeleteDuplicatesButton />} */}
				{/* <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} /> */}
				<Table bordered hover striped responsive variant="primary" {...getTableProps()}>
					<thead>
						{headerGroups.map((headerGroup) => (
							<tr {...headerGroup.getHeaderGroupProps()} className="unselectable">
								{headerGroup.headers.map((column) => (
									<th {...column.getHeaderProps(column.getSortByToggleProps())}>
										{column.render('Header')}
										<span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} className="text-nowrap">
									{row.cells.map((cell) => {
										const columnHeader = cell.column.Header;
										//  If the column header is "#", then render the row index
										if (columnHeader === '#') {
											return <td {...cell.getCellProps()}>{++i + pageIndex * pageSize}</td>;
										} else {
											// Otherwise, render the cell contents
											const { trackUri, artistUri, albumUri } = row.original; //  Get the track, artist, and album URIs from the row data
											let uri = ''; //  Initialize the URI variable
											if (columnHeader === 'Name')
												uri = trackUri; //  If the column header is "Name", then set the URI to the track URI
											else if (columnHeader === 'Artist')
												uri = artistUri; //  If the column header is "Artist", then set the URI to the artist URI
											else if (columnHeader === 'Album') uri = albumUri; //  If the column header is "Album", then set the URI to the album URI
											return (
												<td {...cell.getCellProps()} className="position-relative">
													{cell.render('Cell')}
													<a
														href={uri}
														target="_blank"
														rel="noreferrer"
														className="stretched-link"
														title="Open in Spotify"
													>
														<span className="visually-hidden">{uri}</span>
													</a>
												</td>
											);
										}
									})}
								</tr>
							);
						})}
					</tbody>
				</Table>

				{/* Pagination Information */}
				<p>
					Showing page {pageIndex + 1} of {pageCount} | Total rows: {rows.length}
				</p>

				{/* Pagination Controls */}
				<Pagination size="sm" className="unselectable" css={paginationStyle}>
					{/* First page */}
					<Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
					{/* previous page index */}
					<Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
					{pageIndex > 1 && (
						<Pagination.Item css={paginationHideOnSm} onClick={() => gotoPage(pageIndex - 2)}>
							{pageIndex - 1}
						</Pagination.Item>
					)}
					{pageIndex > 0 && (
						<Pagination.Item css={paginationHideOnSm} onClick={() => gotoPage(pageIndex - 1)}>
							{pageIndex}
						</Pagination.Item>
					)}
					{/* current page */}
					<Pagination.Item css={paginationHideOnSm} active>
						<strong>{pageIndex + 1}</strong>
					</Pagination.Item>
					{pageIndex < pageCount - 1 && (
						<Pagination.Item css={paginationHideOnSm} onClick={() => gotoPage(pageIndex + 1)}>
							{pageIndex + 2}
						</Pagination.Item>
					)}
					{pageIndex < pageCount - 2 && (
						<Pagination.Item css={paginationHideOnSm} onClick={() => gotoPage(pageIndex + 2)}>
							{pageIndex + 3}
						</Pagination.Item>
					)}
					{/* next page index */}
					<Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
					{/* Last page */}
					<Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
				</Pagination>
			</Fragment>
		);
};

const paginationStyle = css`
	@media (max-width: 425px) {
		.page-link,
		.page-item span {
			padding: 0.5rem 0.8rem;
		}
	}
`;

const paginationHideOnSm = css`
	@media (max-width: 992px) {
		display: none;
	}
`;

export default TrackLibrary;
