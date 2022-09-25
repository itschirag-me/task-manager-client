import React, { Fragment } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
} from "react-feather";
import { usePagination, useSortBy, useTable } from "react-table";

const Table = ({ columns = [], totalCount, data, ...props }) => {
  const tableInstance = useTable(
    {
      columns,
      data, 
      initialState: {
        sortBy: [],
        pageSize: 10,
        pageIndex: 0,
        pageCount: totalCount,
      },
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // Pagination
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { sortBy, pageSize, pageIndex },
  } = tableInstance;

  return (
    <Fragment>
      <table className="bg-white rounded shadow w-full" {...getTableProps}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr
              className="bg-gray-100 border-gray-200 border-x border-t p-3 rounded-lg"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="text-start p-4 font-normal"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="flex items-center gap-1 xl:text-base lg:text-base md:text-sm sm:text-xs text-xs">
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDown className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ArrowUp className="w-4 h-4 text-gray-400" />
                        )
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr className="border-t border-gray-200" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="p-4 font-normal xl:text-base lg:text-base md:text-sm sm:text-xs text-xs"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="p-2 mt-2">
        <div className="flex items-center gap-4">
          <button
            disabled={!canPreviousPage}
            onClick={() => previousPage()}
            className={`${
              canPreviousPage
                ? "bg-white text-primary"
                : "bg-gray-50 text-primary"
            } p-2 rounded shadow`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            disabled={!canPreviousPage}
            className={` text-secondary p-1.5 px-4`}
          >
            {pageIndex + 1}
          </button>
          <button
            disabled={!canNextPage}
            onClick={() => nextPage()}
            className={`${
              canNextPage ? "bg-white text-primary" : "bg-gray-50 text-primary"
            } p-2 rounded shadow`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Table;
