import styled from "styled-components";

const StyledLSide = styled.div`
  background-color: pink;
  width: 10%;
  height: 80%;
  display: flex;
  justify-content: center;
  margin-left: 100px;

  .lMenu {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 50px 0;
    border: 1px solid black;
    justify-content: center;
    div {
      padding: 20px 0;
    }

    text-align: center;
  }
`;

const LSide = () => {
  return (
    <>
      <StyledLSide>
        <div className="lMenu">
          <div>왼쪽메뉴..</div>
          <div>게시판</div>
          <div>게시판</div>
          <div>게시판</div>
          <div>게시판</div>
          <div>게시판</div>
        </div>
      </StyledLSide>
    </>
  );
};

export default LSide;
