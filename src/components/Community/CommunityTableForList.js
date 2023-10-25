import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  table {
    width: 100%;
    /* margin-right: 20px;/ */
    /* table-layout: fixed; */
    thead {
      border-bottom: 1px solid #cdf5fd;
      margin-bottom: 10px;
      height: 25px;
      color: #7d7c7c;
      font-weight: bold;
      /* border: solid 1px #3a98b9; */
      tr {
        /* background-color: white; */
        th {
        }
      }
    }
    tbody {
      tr {
      }
    }
  }
`;

const CommunityTableForList = ({ columns, data, onRowClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <Styles>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      fontSize: "0.9rem",
                      borderBottom: "1px solid #CDF5FD",
                    }}
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
export default CommunityTableForList;
