import { Outlet } from "react-router-dom";
import Header from "./Header";
import styled from "styled-components";

const StyleMain = styled.main`
    padding-top: 140px;
    width: 100%;
    display: flex;
    justify-content: center;
`

const HLayout = () => {
    return (
        <>
        <Header />
        <StyleMain>
            <Outlet></Outlet>
        </StyleMain> 
        </>
    );
}

export default HLayout;