import styled from "styled-components";

const StyledMypage = styled.div`
  justify-content: center;
  width: 70%;
  background-color: skyblue;
`;

const Mypage = () => {
  return (
    <StyledMypage>
      <div>
        <h1>MyPage</h1>
      </div>
    </StyledMypage>
  );
};

export default Mypage;
