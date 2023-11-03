import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  table {
    display: flex;
    flex-direction: column;
    table-layout: fixed;
    thead {
      border-bottom: solid 1px #3a98b9;
      display: flex;

      justify-content: space-between;
      tr {
        display: flex;
        flex-direction: row;

        th {
          height: 30px;
          display: flex;
          align-items: center;

          justify-content: center;
          font-weight: bold;
          font-size: 1rem;
          color: #7d7c7c;
        }
      }
    }
    tbody {
      tr {
        border-bottom: #3a98b9;
        display: flex;
        flex-direction: row;
        td {
          display: flex;
          justify-content: center;
          align-items: center;

          border-bottom: 1px solid #cdf5fd;
        }
      }
      tr :hover {
        cursor: pointer;
      }
    }
  }
  /* 
  tr {
    width: 100%;
    display: flex;
    flex-direction: row;
    td {
      justify-content: center;
    }
  } */
`;

const NoticeTableForList = ({ columns, data, onRowClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={
                    column.Header === "제목"
                      ? {
                          width: "350px",
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          fontSize: "0.9rem",
                        }
                      : column.Header === "작성일"
                      ? {
                          width: "150px",
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          fontSize: "0.9rem",
                        }
                      : {
                          width: "120px",
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          fontSize: "0.9rem",
                        }
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => onRowClick(row)}
                // onClick={() => console.log(row.original)}
              >
                {/* {console.log(row)} */}
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={
                      cell.column.Header === "제목"
                        ? {
                            // flexBasis: "350px",
                            // flexGrow: 1,
                            // flexShrink: 0,
                            paddingTop: "8px",
                            paddingBottom: "8px",
                            fontSize: "0.9rem",
                            borderBottom: "1px solid #CDF5FD",
                            // flexGrow: "1",
                            width: "350px",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }
                        : cell.column.Header === "작성일"
                        ? {
                            width: "150px",
                            paddingTop: "8px",
                            paddingBottom: "8px",
                            fontSize: "0.9rem",
                            borderBottom: "1px solid #CDF5FD",

                            textOverflow: "ellipsis",
                          }
                        : {
                            width: "120px",
                            paddingTop: "8px",
                            paddingBottom: "8px",
                            fontSize: "0.9rem",
                            borderBottom: "1px solid #CDF5FD",

                            textOverflow: "ellipsis",
                          }
                    }
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Styles>
  );
};
export default NoticeTableForList;
