import { faFile, faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

const Main = styled.div`
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

        .input-videoinfo {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;

            #videoInfoKind {
                width: 80%;
                height: 20px;
                padding: 5px;
                border: 1px solid #eee;
            }
        }

        .input-title {
            width: 100%;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;

            #videoInfoTitle {
                width: 80%;
                padding: 5px;
                height: 20px;
                border: 1px solid #eee;
            }
        }       
    }

    .main-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        margin-bottom: 30px;

        .btn-font {
            background-color: white;
            border: none;
            width: 60px;
            margin-bottom: 10px;
            cursor: pointer;
        }

        .input-desc {
            width: 100%;
            height: 500px;
            padding: 10px;
            border: 1px solid #eee;
            font-size: 0.8rem;
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

const VideoinfoCreate = () => {
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
                        <optgroup label="정보나눔">
                            <option value="1">용품 후기</option>
                            <option value="2">병원 후기</option>
                            <option value="3">동영상 정보</option>
                        </optgroup>
                    </select>
                    <div className="input-videoinfo">
                        <input type="text" name="videoInfoKind" id="videoInfoKind" placeholder="정보의 종류를 입력해 주세요. 예) 행동 교정, 훈련 등..."/>
                    </div>
                    <div className="input-title">
                        <input type="text" name="videoInfoTitle" id="videoInfoTitle" placeholder="제목을 입력해 주세요."/>
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
                            <input type={fileInput} name="videoInfoFileUrl" id="videoInfoFileUrl"></input>
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

export default VideoinfoCreate;