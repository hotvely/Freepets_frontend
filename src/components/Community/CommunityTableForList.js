import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  table {
    width: 100%;
    margin-right: 20px;
    table-layout: fixed;
  }
  thead {
    border: solid 1px #3a98b9;
  }
  th {
    padding: 10px;
    font-size: 0.8rem;
    color: #3a98b9;
    font-weight: 800;
  }
`;

const CommunityTableForList = ({ columns, data }) => {
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
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
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
