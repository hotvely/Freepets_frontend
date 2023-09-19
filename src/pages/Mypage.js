import styled from "styled-components";

const StyledMain = styled.main`
  justify-content: center;
  width: 70%;
  background-color: skyblue;

  .test {
    color: white;
    background-color: black;
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

const Mypage = () => {
  return (
    <StyledMain>
      <div className="test">여기에는 이미지 들어갈 꺼에여!</div>
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

export default Mypage;
