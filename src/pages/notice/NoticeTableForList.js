import React from "react";
import { useTable } from "react-table";
import styled from "styled-components";

const Styles = styled.div`
  table {
    width: 100%;
    display: flex;
    flex-direction: column;
    table-layout: fixed;
    thead {
      width: 100%;
      border: solid 1px #3a98b9;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      tr {
        th {
          display: flex;
          width: 20%;
          height: 40px;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.05rem;
        }
      }
    }
    tbody {
      tr {
        td {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 20%;
          height: 50px;
          border-bottom: 1px solid #3a98b9;
          font-weight: bold;
        }
      }
      tr :hover {
        cursor: pointer;
      }
    }
  }

  th {
    padding: 10px;
    font-size: 0.8rem;
    color: #3a98b9;
    font-weight: 800;
  }
  tr {
    width: 100%;
    display: flex;
    flex-direction: row;
    td {
      justify-content: center;
    }
  }
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
                {/* {console.log(row)} */}
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
export default NoticeTableForList;
