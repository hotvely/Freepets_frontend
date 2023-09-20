import styled from "styled-components";

const StyledRSide = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  position: block;
  flex: 0 1 300px;
  padding: 0 50px;

  .rMenu {
    background-color: pink;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .rMenuAction {
      display: flex;
      flex-direction: column;

      width: 80%;
      div {
        border: 1px solid black;
        margin: 20px 0;
      }
    }

    text-align: center;
  }
`;

const RSide = () => {
  return (
    <>
      <StyledRSide>
        <div className="rMenu">
          <div className="rMenuAction">
            <div>우측 기능1 asdasdasdadas asdsd </div>
            <div>우측 기능1ads sa ada sasd a </div>
            <div>우측 기능1 ads dasd ad </div>
          </div>
        </div>
      </StyledRSide>
    </>
  );
};

export default RSide;
