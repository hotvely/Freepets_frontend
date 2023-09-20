import styled from "styled-components";

const StyledRSide = styled.div`
  background-color: pink;
  width: 10%;
  height: 300px;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 150px;
  right: 80px;
  margin: 0;

  .rMenu {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: 50px 0;

    justify-content: center;
    div {
      border: 1px solid black;
      margin: 20px 0;
    }

    text-align: center;
  }
`;

const RSide = () => {
  return (
    <>
      <StyledRSide>
        <div className="rMenu">
          <div>우측 기능1 asdasdasdadas asdsd </div>
          <div>우측 기능1ads sa ada sasd a </div>
          <div>우측 기능1 ads dasd ad </div>
        </div>
      </StyledRSide>
    </>
  );
};

export default RSide;
