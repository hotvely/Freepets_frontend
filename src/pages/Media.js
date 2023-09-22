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
    &.media-summary{
        padding: 10px;
        width: 25%;
        flex-wrap: wrap;
        justify-content: center;
    }
    section {
        display: flex;
        background-color: pink;
        width: 25%
    
    .media-thumbnail{
        display: block;
        width: 237px;
        background-color: orange;

    }

    .media-info{
        background-color: lightblue;
    }

    }
`;

const Media = () => {

    return(
        <Container>
            <HeadImg>
            <h1>배너 이미지 들어갈 곳</h1>
            </HeadImg>
            
            <MainArea>
               <MainContent className="media-summary">
                <section>
                    <a href="#">
                        <div className="media-thumbnail">
                        <img src="./resources/pebbleTV.jpg" alt="미디어썸네일"/>
                            <div className="media-info">
                                <a href="#">
                                <h3>이불 빨래하는 돌맹이</h3>
                                </a>
                                <a href="#">
                                <p>[<span>7</span>]</p>
                                </a>
                                <p>노릇한 군밤이</p>
                                <p>
                                    <span>2023.09.22</span>ㆍ조회수<span className="viewCount">22</span>회
                                </p>

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