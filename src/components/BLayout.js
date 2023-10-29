import { Outlet } from "react-router-dom";
import Header from "./Header";
import LSide from "./LSide";
import RSide from "./RSide";
import styled from "styled-components";

const StyleMain = styled.main`
  padding: 150px 0;
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

const BLayout = () => {
  return (
    <>
      <Header></Header>

      <StyleMain>
        <LSide></LSide>
        <Outlet></Outlet>
        <RSide></RSide>
      </StyleMain>
    </>
  );
};

export default BLayout;
