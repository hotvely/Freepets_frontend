import styled from "styled-components";

const StyledLSide = styled.div`
  background-color: red;
  width: 15%;
  justify-content: left;
`;

const LSide = () => {
  return (
    <>
      <StyledLSide>
        <div>왼쪽...</div>
      </StyledLSide>
    </>
  );
};

export default LSide;
