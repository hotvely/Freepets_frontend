import styled from "styled-components";

const StyledLSide = styled.div`
  background-color: lightgray;
  width: 10%;
  height: 80%;
  display: flex;
  justify-content: center;
  margin-left: 50px;

  .lMenu {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 50px 0;
    border: 1px solid black;
    justify-content: center;
    a {
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
          <a href="#">왼쪽메뉴..</a>
          <a href="#">게시판1</a>
          <a href="#">게시판2</a>

          <a href="#">게시판3</a>
          <a href="#">게시판4</a>
          <a href="#">게시판5</a>
        </div>
      </StyledLSide>
    </>
  );
};

export default LSide;
