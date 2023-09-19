import styled from "styled-components";

const StyledRSide = styled.div`
  background-color: pink;
  width: 15%;
  height: 80%;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;

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
          <div>우측 기능1</div>
          <div>우측 기능1</div>
          <div>우측 기능1</div>
        </div>
      </StyledRSide>
    </>
  );
};

export default RSide;
