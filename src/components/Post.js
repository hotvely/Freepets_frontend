import { faFile, faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
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

        .input-center {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;

            #blank1 {
                width: 40%;
                height: 20px;
                padding: 5px;
                border: 1px solid #eee;
                margin-right: 13px;
            }

            #blank2 {
                width: 39%;
                padding: 5px;
                border: 1px solid #eee;
            }
        }

        .input-end {
            width: 100%;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;

            #blank3 {
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

const Post = ({name1, name2, name3, text1, text2, text3}) => {
    const [fileInput, setFileInput] = useState("hidden");
    const [desc, setDesc] = useState("");

    const fileClick = () => {
        setFileInput("file");
    }

    const onClick = () => {

    }

    const InputHandler = (e) => {
        setDesc(e.currentTarget.innerText);
    }
    return (
        <Main>
            <div style={{width : "100%", height : "100px", backgroundColor: "black", marginBottom : "50px", padding: "0px 10px"}}></div>
            <MainBox>
                <div className="header-content">
                    <select className="select select-category" onChange={onClick}>
                        <option>게시판을 선택해 주세요.</option>
                        <option value="1">커뮤니티</option>
                        <option value="2">분실</option>
                        <option value="3">시터</option>
                        <option value="3">병원정보</option>
                    </select>
                    <div className="input-center">
                        <input type="text" name={name1} id="blank1" placeholder={text1}/>
                        <input type="text" name={name2} id="blank2" placeholder={text2}/>
                    </div>
                    <div className="input-end">
                        <input type="text" name={name3} id="blank3" placeholder={text3}/>
                    </div>
                </div>
                <div className="main-content">
                    <div>
                    <button className="btn btn-font btn-font-emph" style={{backgroundColor: "yellow"}} onClick={onClick}>강조</button>
                        <button className="btn btn-font btn-font-common" onClick={onClick}>기본</button>
                        <button className="btn btn-font btn-font-bold" style={{fontWeight : "bold"}} onClick={onClick}>굵게</button>
                        <button className="btn btn-font btn-font-italic" style={{fontStyle: "italic"}} onClick={onClick}>기울게</button>
                        <button className="btn btn-font btn-font-line" style={{textDecoration : "underline"}} onClick={onClick}>밑줄</button>
                        <button className="btn btn-font btn-font-cancel" style={{textDecoration : "line-through"}} onClick={onClick}>취소선</button>
                        <button className="btn btn-font btn-font-left" onClick={onClick}>왼쪽</button>
                        <button className="btn btn-font btn-font-center" onClick={onClick}>가운데</button>
                        <button className="btn btn-font btn-font-right" onClick={onClick}>오른쪽</button>
                        <button className="btn btn-font btn-file-image" onClick={fileClick}><FontAwesomeIcon icon={faImage}/></button>
                        <button className="btn btn-font btn-file-video" onClick={fileClick}><FontAwesomeIcon icon={faVideo}/></button>
                        <button className="btn btn-font btn-file" onClick={fileClick}><FontAwesomeIcon icon={faFile}/></button>
                        <div>
                            <input type={fileInput} name="file" id="file"></input>
                        </div>
                        
                    </div>
                    <div contentEditable="true" className="input-desc" onInput={InputHandler} suppressContentEditableWarning="true"></div>                   
                </div>
                <div className="footer-content">
                    <button onClick={onClick} className="btn btn-footer btn-reset">초기화</button>
                    <button onClick={onClick} className="btn btn-footer btn-submit">등록</button>
                </div>
            </MainBox>
        </Main>
    )
}

export default Post;