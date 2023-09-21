import styled from "styled-components";

const StyledLSide = styled.div`
  background-color: white;
  display: flex;
  flex: 0 1 300px;
  padding-left: 50px;

  /* justify-content: center; */

  .Laside {
    display: flex;
    justify-content: center;
    align-items: start;
    border: 8px solid skyblue;
    border-radius: 25px;
    width: 100%;
    height: 500px;
    padding: 30px 0px;
    .lMenu {
      display: flex;
      flex-direction: column;
      width: 100%;
      justify-content: space-between;

      hr {
        width: 90%;
      }
      label {
        font-size: 1.2rem;
        font-weight: bold;
        color: skyblue;
        padding: 15px 0;
      }
      a {
        color: black;
        padding: 10px 0;
      }

      text-align: center;
    }
  }
`;

const LSide = () => {
  return (
    <>
      <StyledLSide>
        <div className="Laside">
          <div className="lMenu">
            <label>커뮤니티</label>
            <a href="#">자유게시판</a>
            <a href="#">펫시터</a>
            <hr />
            <label>플리마켓</label>
            <a href="#">자유게시판</a>
            <a href="#">자유게시판</a>
            <hr />
            <label>정보나눔</label>
            <a href="#">자유게시판</a>
            <a href="#">자유게시판</a>
            <a href="#">자유게시판</a>
            <hr />
          </div>
        </div>
      </StyledLSide>
    </>
  );
};

export default LSide;
