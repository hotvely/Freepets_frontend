import styled from "styled-components";

const StyledLSide = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  flex: 0 0 200px;
  margin-left: 50px;
  height: 130vh;
  /* padding-left: 50px; */

  /* justify-content: center; */

  .Laside {
    display: flex;
    flex: 0 0 220px;
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
            <label>NOITCE</label>
            <a href="/notice">Notice</a>
            <a href="/notice/event">Event Info</a>
            <hr />
            <label>Community</label>
            <a href="/community">CommonBoard</a>
            <a href="/community/lost">LostBoard</a>
            <hr />
            <label>Information</label>
            <a href="#">Hospital Info</a>
            <hr />
            <label>Sitter</label>
            <a href="/Sitter">Sitter</a>
          </div>
        </div>
      </StyledLSide>
    </>
  );
};

export default LSide;
