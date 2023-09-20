import styled from "styled-components";
import testimg from "../resources/image.jpg";

const StyledMain = styled.main`
  justify-content: center;
  width: 70%;
  background-color: skyblue;

  .BoardTitleImg {
    color: white;
    background-color: black;
    width: 100%;
  }
  .test2 {
    border: 1px solid #444444;
    tr,
    td,
    th {
      border: 1px solid #444444;
    }
  }
`;

const BoardTest = () => {
  return (
    <StyledMain>
      <img src={testimg} className="BoardTitleImg"></img>
      <table className="test2">
        <thead>
          <tr>
            <th>test</th>
            <th>test</th>
            <th>test</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>123</td>
            <td>123</td>
            <td>123</td>
          </tr>
        </tbody>
      </table>
    </StyledMain>
  );
};

export default BoardTest;
