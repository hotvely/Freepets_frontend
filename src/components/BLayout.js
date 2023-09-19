import { Outlet } from "react-router-dom";
import Header from "./Header";
import LSide from "./LSide";
import RSide from "./RSide";
import styled from "styled-components";

const StyleMain = styled.main`
  display: flex;
  padding: 150px 0;
  /* justify-content: center; */
`;
const StyleSide = styled.div`
  display: flex;
  flex-direction: row;
  position: sticky;
  top: 400px;
`;

const BLayout = () => {
  return (
    <>
      <Header></Header>

      <RSide></RSide>

      <StyleMain>
        <LSide></LSide>
        <Outlet></Outlet>
      </StyleMain>
    </>
  );
};

export default BLayout;
