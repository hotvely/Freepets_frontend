import styled from "styled-components";


const Main = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
`

const MainBox = styled.div`
    width: 80%;
    height: 700px;
    border: 1px solid #eee;
`

const Chatting = () => {
    return(
        <Main>
            <MainBox></MainBox>
        </Main>
    )
}

export default Chatting;