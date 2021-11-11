/** @jsxImportSource @emotion/react */
import { Table, Pagination } from "react-bootstrap";
import { useTable, useSortBy, usePagination } from "react-table";
import { css } from "@emotion/react";
// import { css } from "@emotion/css";

const TrackLibrary = ({ columns, data }) => {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    headerGroups,
    page,
    prepareRow,

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
    useSortBy,
    usePagination
  );

  return (
    <>
      <Table bordered hover striped responsive variant="dark" {...getTableProps()}>
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
              <tr {...row.getRowProps()} className="position-relative text-nowrap">
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>
                      {cell.render("Cell")}
                      <a href={row.original.track.uri} target="_blank" rel="noreferrer" className="stretched-link">
                        <span className="visually-hidden">{row.original.track.external_urls.spotify}</span>
                      </a>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Pagination
        size="sm"
        css={css`
          justify-content: center;
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
