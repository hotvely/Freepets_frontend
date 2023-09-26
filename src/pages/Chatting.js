import styled from "styled-components";
import kero from '../resources/kero.jpeg';


const Main = styled.div`
    width: 100%;
    height: 65vh;
    display: flex;
    justify-content: center;
`

const MainBox = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;

    .chatting-message_wrtie {      
        display: flex;
        justify-content: center;
        height: 40px;        
        width: 100%;
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
`

const Chatting = () => {
    return(
        <Main>
            <MainBox>
                <div className="chatting-message">
                    <div>
                        <img src={kero} style={{width: "80px", height:"80px", objectFit: "cover", borderRadius: "50px"}}/>
                    </div>
                </div>
                <div className="chatting-message_wrtie">
                    <div contentEditable="true" id="message"></div>
                    <button className="chatting-message_write-btn">보내기</button>
                </div>
            </MainBox>
        </Main>
    )
}

export default Chatting;