import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const StyleMain = styled.main`
    padding: 150px 0;
    width: 100%;
  

    display: flex;
    justify-content: center;
`

const HLayout = () => {
    return (
        <>
        <Header></Header>
        <StyleMain>
            <Outlet></Outlet>
        </StyleMain>
        
    </>
    );
}

export default HLayout;