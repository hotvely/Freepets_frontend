import { faFile, faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const Main = styled.div`
    margin: 0px 40px;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    flex-direction: column;
`
const MainBox = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
    width : 100%;
    border : 1px solid #B1DEEC;

    .header-content {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;

        .select-category {
        width: 81%;
        height: 30px;
        margin-bottom: 10px;
        border: solid 1px #eee;
        }

        .input-sitter {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;

            #sitterPrice {
                width: 40%;
                height: 20px;
                padding: 5px;
                border: 1px solid #eee;
                margin-right: 13px;
            }

            #sitterLoc {
                width: 38%;
                padding: 5px;
                border: 1px solid #eee;
            }
        }

        .input-title {
            width: 100%;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;

            #sitterTitle {
                width: 80%;
                padding: 5px;
                height: 20px;
                border: 1px solid #eee;
            }
        }       
    }

    .main-content {
        display: flex;
        width: 80%;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;

        .btn-font {
            background-color: white;
            border: none;
            width: 55px;
            margin-bottom: 10px;
            cursor: pointer;
        }

        .input-desc {
            width: 100%;
            height: 500px;
            padding: 10px;
            border: 1px solid #eee;
            font-size: 0.8rem;
            line-height: 20px;
        }
    }

    .footer-content {

        .btn-footer {
            width: 100px;
            height: 30px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            color: #237A8E;
            font-weight: bold;
            cursor: pointer;
            
        }
    }
`

const ContentButton = () => {
    
}

const SitterCreate = () => {
    const [fileInput, setFileInput] = useState("hidden");
    const [desc, setDesc] = useState("");

    const InputHandler = (e) => {
        setDesc(e.currentTarget.innerText);
    }

    const FileClick = () => {
        setFileInput("file");
    }

    return (
        <Main>
            <div style={{width : "100%", height : "100px", backgroundColor: "black", marginBottom : "50px", padding: "0px 10px"}}></div>
            <MainBox>
                <div className="header-content">
                    <select className="select select-category">
                        <option>게시판을 선택해 주세요.</option>
                        <optgroup label="플리마켓">
                            <option value="1">펫시터</option>
                            <option value="2">중고마켓</option>
                        </optgroup>
                    </select>
                    <div className="input-sitter">
                        <input type="text" name="sitterPrice" id="sitterPrice" placeholder="시터 비용을 입력해 주세요."/>
                        <input type="text" name="sitterLoc" id="sitterLoc" placeholder="시터 활동 가능 지역을 입력해 주세요."/>
                    </div>
                    <div className="input-title">
                        <input type="text" name="sitterTitle" id="sitterTitle" placeholder="제목을 입력해 주세요."/>
                    </div>
                </div>
                <div className="main-content">
                    <div>
                    <button className="btn btn-font btn-font-emph" style={{backgroundColor: "yellow"}} onClick={ContentButton}>강조</button>
                        <button className="btn btn-font btn-font-common" onClick={ContentButton}>기본</button>
                        <button className="btn btn-font btn-font-bold" style={{fontWeight : "bold"}} onClick={ContentButton}>굵게</button>
                        <button className="btn btn-font btn-font-italic" style={{fontStyle: "italic"}} onClick={ContentButton}>기울게</button>
                        <button className="btn btn-font btn-font-line" style={{textDecoration : "underline"}} onClick={ContentButton}>밑줄</button>
                        <button className="btn btn-font btn-font-cancel" style={{textDecoration : "line-through"}} onClick={ContentButton}>취소선</button>
                        <button className="btn btn-font btn-font-left" onClick={ContentButton}>왼쪽</button>
                        <button className="btn btn-font btn-font-center" onClick={ContentButton}>가운데</button>
                        <button className="btn btn-font btn-font-right" onClick={ContentButton}>오른쪽</button>
                        <button className="btn btn-font btn-file-image" onClick={FileClick}><FontAwesomeIcon icon={faImage}/></button>
                        <button className="btn btn-font btn-file-video" onClick={FileClick}><FontAwesomeIcon icon={faVideo}/></button>
                        <button className="btn btn-font btn-file" onClick={FileClick}><FontAwesomeIcon icon={faFile}/></button>
                        <div>
                            <input type={fileInput} name="sitterDesc" id="sitterDesc"></input>
                        </div>
                        
                    </div>
                    <div contentEditable="true" className="input-desc" onInput={InputHandler} suppressContentEditableWarning="true"></div>                   
                </div>
                <div className="footer-content">
                    <button onClick={ContentButton} className="btn btn-footer btn-reset">초기화</button>
                    <button onClick={ContentButton} className="btn btn-footer btn-submit">등록</button>
                </div>
            </MainBox>
        </Main>
    )
}

export default SitterCreate;