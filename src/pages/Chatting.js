import styled from "styled-components";
import kero from '../resources/kero.jpeg';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addMessage, getMessageList, getMessageOne } from "../api/chatting";
import { dateFormatDefault } from "../api/utils";
import { getMemberByIdAPI } from "../api/auth";
import { useSelector } from "react-redux";

const Main = styled.div`
    width: 100%;
    height: 70vh;
    display: flex;
    justify-content: center;
`

const MainBox = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    .chatting-start {
        margin-top: 10px;

        p {
            background-color: #E5EFF8;
            padding: 5px;
            border-radius: 5px;

            #nickname {
                font-weight: bold;
            }
        }
    }

    .chatting-message {
        display: flex;
        flex-direction: column;
        width: 100%;

        .chatting-message_list {
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow: auto;
            margin-bottom: 20px;

            .chatting-message_list-sender {
                display: flex;
                justify-content: flex-end;
                margin: 10px;
                margin-right: 20px;

                .chatting-message_list-sender_info {
                    display: flex;

                    img {
                        margin-right: 10px;
                    }

                    .sender-message {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;   
                        
                        .sender-message_nickname {
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid #ddd;

                            #sender {
                                padding: 5px 0px;
                            }

                            #date {
                                display: flex;
                                color: #98C2D4;
                                align-items: center;
                                font-size: 0.6rem;

                            }
                        }

                        .sender-message_desc {
                            #desc {
                                width: 200px;
                                font-size: 0.9rem;
                            }
                        }                      
                        }
                    }
                }
            }

            .chatting-message_list-receiver {
                display: flex;
                margin-left: 20px;
                margin: 10px;

                .chatting-message_list-receiver_info {
                    display: flex;

                    img {
                        margin-right: 10px;
                    }

                    .receiver-message {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;   
                        
                        .receiver-message_nickname {
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid #ddd;

                            #receiver {
                                padding: 5px 0px;
                            }

                            #date {
                                display: flex;
                                color: #98C2D4;
                                align-items: center;
                                font-size: 0.6rem;
                                margin-left: 5px;

                            }
                        }

                        .receiver-message_desc {
                            #desc {
                                width: 200px;
                                font-size: 0.9rem;

                            }
                        }
                }
            }
        }

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
    }
`

const Chatting = () => {
    const [content, setContent] = useState();
    const [messages, setMessages] = useState([]);
    const [nickname, setNickname] = useState();
    const { id } = useParams();

    const data = JSON.parse(localStorage.getItem('user'));

    const onSendMessage = async () => {
        const formData = new FormData();
        formData.append('token', data.token);
        formData.append('receiver.id', id);
        formData.append('chattingContent', content);
        console.log(formData);
        const result = await addMessage(formData);
        const resultOne = await getMessageOne(result.data.chattingCode);
        setMessages([...messages, resultOne.data]);
        setContent('');
    };

    const getMessageAPI = async () => {
        const result = await getMessageList(data.token, id);
        console.log(result.data);
        setMessages(result.data);
    };

    const onMessageChange = (e) => {
        setContent(e.target.value);
    };

    const getMemberNick = async () => {
      const member = await getMemberByIdAPI(id);
      setNickname(member.data.nickname);
    }

    useEffect(() => {
        window.scrollTo(0, document.body.scrollHeight);
        getMessageAPI();
        getMemberNick();
    }, []);

    return(
        <Main>
            <MainBox>
                <div className="chatting-container">
                    <div className="chatting-start">
                        <p><span id="nickname">{nickname}</span> 님과 1:1 대화입니다.</p>
                    </div>
                </div>
                <div className="chatting-message">
                    {messages.map((item) => (
                    <div className="chatting-message_list" key={item.chattingCode}>
                        {item.sender.id == data.id ? 
                        <div className="chatting-message_list-sender">
                            <div className="chatting-message_list-sender_info">
                                <img src={kero} style={{width: "50px", height:"50px", objectFit: "cover", borderRadius: "50px"}}/>
                                <div className="sender-message">
                                    <div className="sender-message_nickname">                                     
                                        <p id="sender">{item.sender.nickname}</p>
                                        <p id="date">{dateFormatDefault(item.chattingDate)}</p>
                                    </div>
                                    <div className="sender-message_desc">
                                        <p id="desc">{item.chattingContent}</p>
                                    </div>                                    
                                </div>
                            </div>                        
                        </div> : <div className="chatting-message_list-receiver">
                            <div className="chatting-message_list-receiver_info">
                                <img src={kero} style={{width: "50px", height:"50px", objectFit: "cover", borderRadius: "50px"}}/>
                                <div className="receiver-message">
                                    <div className="receiver-message_nickname">                                     
                                        <p id="receiver">{item.sender.nickname}</p>
                                        <p id="date">{dateFormatDefault(item.chattingDate)}</p>
                                    </div>
                                    <div className="receiver-message_desc">
                                        <p id="desc">{item.chattingContent}</p>
                                    </div>                                    
                                </div>
                            </div>                           
                        </div>
                        }                      
                    </div>
                    ))}

                    <div className="chatting-message_wrtie">
                        <input type="text" id="message" onChange={onMessageChange} value={content}></input>
                        <button className="chatting-message_write-btn" onClick={onSendMessage}>보내기</button>
                    </div>
                </div>        
            </MainBox>
        </Main>
    )
}

export default Chatting;