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
