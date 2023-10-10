import styled from "styled-components";

const StyledLSide = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  flex: 0 0 250px;
  margin-left: 100px;
  height: 130vh;
  /* padding-left: 50px; */

  /* justify-content: center; */

  .Laside {
    display: flex;
    flex: 0 0 250px;
    justify-content: center;
    align-items: start;
    border: 8px solid skyblue;
    border-radius: 25px;

    /* width: 300px; */
    height: 500px;
    /* padding: 30px 0px; */
    .lMenu {
      display: flex;
      flex: 1 1 100%;
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
            <label>공지사항</label>
            <a href="#">공지사항</a>
            <a href="#">이벤트 및 행사</a>
            <hr />
            <label>커뮤니티</label>
            <a href="#">자유게시판</a>
            <a href="#">분실물</a>
            <hr />           
            <label>정보나눔</label>
            <a href="#">시터</a>
            <a href="#">병원 정보</a>
          </div>
        </div>
      </StyledLSide>
    </>
  );
};

export default LSide;
