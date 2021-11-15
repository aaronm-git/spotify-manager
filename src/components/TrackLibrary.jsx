/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Row, Col, Table, Pagination, Form } from "react-bootstrap";
import { useTable, useSortBy, usePagination, useGlobalFilter, useAsyncDebounce } from "react-table";
import { css } from "@emotion/react";
// import { css } from "@emotion/css";

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

const TrackLibrary = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,

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

  return (
    <>
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
                    const trackUri = row.original.track.uri;
                    const artistUri = row.original.track.artists[0].uri;
                    const albumUri = row.original.track.album.uri;
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

      <Pagination
        size="sm"
        className="unselectable"
        css={css`
          li {
            min-width: 3rem;
            text-align: center;
          }
        `}
      >
        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
        {/* <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} /> */}

        {/* previous page index */}
        {pageIndex > 1 && <Pagination.Item onClick={() => gotoPage(pageIndex - 2)}>{pageIndex - 1}</Pagination.Item>}
        {pageIndex > 0 && <Pagination.Item onClick={() => gotoPage(pageIndex - 1)}>{pageIndex}</Pagination.Item>}

        {/* current page */}
        <Pagination.Item active>
          <strong>{pageIndex + 1}</strong>
        </Pagination.Item>

        {/* next page index */}
        {pageIndex < pageCount - 1 && (
          <Pagination.Item onClick={() => gotoPage(pageIndex + 1)}>{pageIndex + 2}</Pagination.Item>
        )}
        {pageIndex < pageCount - 2 && (
          <Pagination.Item onClick={() => gotoPage(pageIndex + 2)}>{pageIndex + 3}</Pagination.Item>
        )}

        {/* <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} /> */}
        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
      </Pagination>
    </>
  );
};

export default TrackLibrary;
