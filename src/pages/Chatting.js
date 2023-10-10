import styled from "styled-components";
import kero from '../resources/kero.jpeg';

const Main = styled.div`
    width: 100%;
    height: 70vh;
    display: flex;
    justify-content: center;
`

const MainBox = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .chatting-start {
        margin-top: 10px;
    }

    .chatting-message {
        display: flex;
        justify-content: center;
        width: 100%;

        .chatting-message_wrtie {      
            display: flex;
            justify-content: center;
            height: 40px;        
            width: 80%;
            margin-bottom: 20px;
    
            #message {
                width: 80%;
                padding: 5px;
                border: 1px solid #eee;
                border-radius: 10px;
                font-size: 0.8rem;
                line-height: 15px;
                overflow: auto;
            }
    
            .chatting-message_write-btn {
                margin-left: 10px;
                border: none;
                border-radius: 5px;
                padding: 0px 10px;
                cursor: pointer;
                color: white;
                background-color: #68b0c9;
            }
        }
    }
`

const Chatting = () => {
    return(
        <Main>
            <MainBox>
                <div className="chatting-container">
                    <div className="chatting-start">
                        <p><span id="nickname">베로</span> 님과 1:1 대화입니다.</p>
                    </div>
                    <div>
                        <img src={kero} style={{width: "80px", height:"80px", objectFit: "cover", borderRadius: "50px"}}/>
                    </div>
                </div>
                <div className="chatting-message">
                    <div className="chatting-message_wrtie">
                        <div contentEditable="true" id="message"></div>
                        <button className="chatting-message_write-btn">보내기</button>
                    </div>
                </div>        
            </MainBox>
        </Main>
    )
}

export default Chatting;