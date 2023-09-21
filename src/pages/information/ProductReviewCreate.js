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

        .select-category {
        width: 80%;
        height: 30px;
        margin-bottom: 10px;
        border: solid 1px #eee;
        }

        .input-saleshop {
            width: 100%;
            display: flex;
            justify-content: center;
            margin-bottom: 10px;

            #saleshopName {
                width: 39%;
                height: 30px;
                border: 1px solid #eee;
                margin-right: 13px;
            }

            #saleshopUrl {
                width: 39%;
                border: 1px solid #eee;
            }
        }

        .input-title {
            width: 100%;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;

            #productReviewTitle {
                width: 80%;
                height: 30px;
                border: 1px solid #eee;
            }
        }       
    }

    .main-content {

        .btn-font {
            background-color: white;
            border: none;
            width: 60px;
            margin-bottom: 10px;
            cursor: pointer;
        }
    }
`

const ContentButton = () => {
    
}

const ProductReviewCreate = () => {
    const [fileInput, setFileInput] = useState("hidden");

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
                    <div className="input-saleshop">
                        <input type="text" name="saleshopName" id="saleshopName" placeholder="물건을 구매한 사이트 및 용품점 이름을 입력해 주세요."/>
                        <input type="text" name="saleshopUrl" id="saleshopUrl" placeholder="물건을 구매한 사이트 주소를 입력해 주세요."/>
                    </div>
                    <div className="input-title">
                        <input type="text" name="productReviewTitle" id="productReviewTitle" placeholder="제목을 입력해 주세요."/>
                    </div>
                </div>
                <div className="main-content">
                    <div>
                        <button className="btn btn-font btn-font-thin" onClick={ContentButton}>얇게</button>
                        <button className="btn btn-font btn-font-midium" onClick={ContentButton}>중간</button>
                        <button className="btn btn-font btn-font-bold" onClick={ContentButton}>굵게</button>
                        <button className="btn btn-font btn-font-itelic" onClick={ContentButton}>기울게</button>
                        <button className="btn btn-font btn-font-line" onClick={ContentButton}>밑줄</button>
                        <button className="btn btn-font btn-font-cancel" onClick={ContentButton}>취소선</button>
                        <button className="btn btn-font btn-font-left" onClick={ContentButton}>왼쪽</button>
                        <button className="btn btn-font btn-font-center" onClick={ContentButton}>가운데</button>
                        <button className="btn btn-font btn-font-right" onClick={ContentButton}>오른쪽</button>
                        <button className="btn btn-font btn-file-image" onClick={FileClick}><FontAwesomeIcon icon={faImage}/></button>
                        <button className="btn btn-font btn-file-video" onClick={FileClick}><FontAwesomeIcon icon={faVideo}/></button>
                        <button className="btn btn-font btn-file" onClick={FileClick}><FontAwesomeIcon icon={faFile}/></button>
                        <input type={fileInput}></input>
                    </div>
                    
                    <textarea cols="150" rows="30" style={{resize: "none"}} id="productReviewDesc" name="productReviewDesc" placeholder="내용을 입력해 주세요."></textarea>
                </div>
                <div className="footer-content">
                    <button onClick={ContentButton} className="btn btn-reset">초기화</button>
                    <button onClick={ContentButton} className="btn btn-submit">등록</button>
                </div>
            </MainBox>
        </Main>
    )
}

export default ProductReviewCreate;