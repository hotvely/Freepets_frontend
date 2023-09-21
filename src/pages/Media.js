import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

`;

const HeadImg = styled.h1`
    width: 1200px;
    height: 100px;
    border: 1px solid;
`;

const MainArea = styled.div`
    margin-top: 50px;
    width: 1200px;
    height: 100vh;
    border: 1px solid #68B0C9;
`;

const MainContent = styled.div`

`;

const Media = () => {

    return(
        <Container>
            <HeadImg>
            <h1>배너 이미지 들어갈 곳</h1>
            </HeadImg>
            
            <MainArea>
               <MainContent>
                <section>
                    <a href="#">
                        <div className="media-thumbnail">
                        <img src="./resources/pebbleTV.jpg" alt="미디어썸네일"/>
                            <div className="media-info">
                                <h3>돌멩2_TV</h3>

                            </div>
                        </div>
                    </a>
                </section>
               </MainContent>
            </MainArea>
        </Container>
    )
    
};

export default Media;