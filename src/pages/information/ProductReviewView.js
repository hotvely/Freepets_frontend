import styled from "styled-components";

const Main = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
`

const MainBox = styled.main`
    padding: 20px 10px;
    width : 900px;
    border : 1px solid #B1DEEC;
`

const ProductReviewView = () => {
    return (
        <Main>
            <MainBox></MainBox>
        </Main>
    )
}

export default ProductReviewView;