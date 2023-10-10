import styled from "styled-components";

const Main = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    flex-direction: column;
`

const MainBox = styled.main`
    padding: 20px 10px;
    width : 100%;
    border : 1px solid #B1DEEC;
`

const ProductReviewView = () => {
    return (
        <Main>
            <div style={{width : "100%", height : "100px", backgroundColor: "black", marginBottom : "50px", padding: "0px 10px"}}></div>
            <MainBox>

            </MainBox>
        </Main>
    )
}

export default ProductReviewView;