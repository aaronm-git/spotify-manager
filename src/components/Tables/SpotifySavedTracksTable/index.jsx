/** @jsxImportSource @emotion/react */

import { useMemo, Fragment } from 'react';
import { Table, Pagination } from 'react-bootstrap';
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from 'react-table';
import { css } from '@emotion/react';

// Components
import GlobalFilter from '../GlobalFilter';

export default function SpotifySavedTracksTable(props) {
	const data = useMemo(() => props.data || [], [props.data]);
	const columns = useMemo(() => props.columns, [props.columns]);

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
			initialState: { hiddenColumns: ['trackId', 'artistId', 'albumId', 'referenceId'] },
		},
		useGlobalFilter,
		useFilters,
		useSortBy,
		usePagination
	);

	return (
		<Fragment>
			<GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
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
}

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
