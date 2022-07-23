/** @jsxImportSource @emotion/react */

import { useState, useContext, useEffect, useMemo, Fragment } from "react";
import { Row, Col, Table, Pagination, Form } from "react-bootstrap";
import { useTable, useSortBy, usePagination, useGlobalFilter, useAsyncDebounce } from "react-table";
import { css } from "@emotion/react";
import SpotifyContext from "../context/spotify/spotifyContext";
import myTracks from "../all-tracks.json";
import GlobalContext from "../context/GlobalContext";
import Loading from "./layout/Loading";

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 500);

  return (
    <Row>
      <Col lg="3">
        <Form.Control
          value={value || ""}
          type="text"
          placeholder="Search..."
          className="my-2"
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
        />
      </Col>
    </Row>
  );
};

const TrackLibrary = () => {
  const [library, setLibrary] = useState([]);
  const spotifyContext = useContext(SpotifyContext);
  const globalContext = useContext(GlobalContext);
  const { getUserSavedTracks } = spotifyContext;
  const { loading, setLoading } = globalContext;

  console.log("rendered trackLibrary() component");

  useEffect(() => {
    // console.log("useeffect firing with timeout");
    // setLoading(true);
    // setTimeout(() => {
    //   setLibrary(myTracks);
    //   setLoading(false);
    // }, 5000);

    (async () => {
      const tracks = await getUserSavedTracks();
      setLibrary(tracks);
    })();
  }, []);

  const data = useMemo(() => {
    return library.map((libraryData) => ({
      id: libraryData.track.id,
      trackName: libraryData.track.name,
      albumName: libraryData.track.album.name,
      artistName: libraryData.track.artists[0].name,
      trackUri: libraryData.track.uri,
      artistUri: libraryData.track.artists[0].uri,
      albumUri: libraryData.track.album.uri,
      trackData: libraryData.track,
    }));
  }, [library]);

  const columns = useMemo(() => {
    return [
      {
        Header: "#",
      },
      {
        Header: "Name",
        accessor: "trackName",
      },
      {
        Header: "Artist",
        accessor: "artistName",
      },
      {
        Header: "Album",
        accessor: "albumName",
      },
    ];
  }, []);

  const {
    getTableProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    rows,

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />

      <Table bordered hover striped responsive variant="primary" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} className="unselectable">
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
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
                  if (columnHeader === "#") {
                    return <td {...cell.getCellProps()}>{++i + pageIndex * pageSize}</td>;
                  } else {
                    const { trackUri, artistUri, albumUri } = row.original;
                    let uri = "";
                    if (columnHeader === "Name") uri = trackUri;
                    else if (columnHeader === "Artist") uri = artistUri;
                    else if (columnHeader === "Album") uri = albumUri;

                    return (
                      <td {...cell.getCellProps()} className="position-relative">
                        {cell.render("Cell")}
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

      <p>
        Showing page {pageIndex + 1} of {pageCount} | Total rows: {rows.length}
      </p>

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
