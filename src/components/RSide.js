import styled from "styled-components";

const StyledRSide = styled.div`
  width: 300px;
  height: 400px;
  display: flex;
  justify-content: center;
  position: block;
  padding-right: 50px;
  .rMenu {
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    .rMenuAction {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      border: 10px solid skyblue;
      border-radius: 25px;
      width: 100%;
      div {
        flex: 1 1 80%;
        width: 80%;
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
