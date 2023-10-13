import { faFile, faImage, faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo, useState } from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import SitterPost from "./SitterPost";
import CommunityPost from "./CommunityPost";
import LostPost from "./LostPost";
import HospitalPost from "./HospitalPost";

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

        .input-rank {
            width: 100%;

            .input-center {
                width: 100%;
                display: flex;
                justify-content: center;
                margin-bottom: 10px;

                #rank1 {
                    width: 39%;
                    height: 20px;
                    padding: 5px;
                    border: 1px solid #eee;
                    margin-right: 13px;
                }

                #rank2 {
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

                #rank3 {
                    width: 80%;
                    padding: 5px;
                    height: 20px;
                    border: 1px solid #eee;
                }
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
        margin-top: 20px;

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

const Post = () => {
    const [fileInput, setFileInput] = useState("hidden");
    const [desc, setDesc] = useState("");
    const [select, setSelect] = useState(null);
    const [rank1, setRank1] = useState();
    const [rank2, setRank2] = useState();
    const [rank3, setRank3] = useState();

    const fileClick = () => {
        setFileInput("file");
    }

    const onClick = () => {
        console.log(rank1);
        console.log(rank2);
        console.log(rank3);

        if(rank1 == null || rank2 == null || rank3 == null) {
            alert('입력하지 않은 항목이 있습니다.')
        }
    }

    const InputDescHandler = (e) => {
        console.log(e);
        setDesc(e);
    }

    const selectChange = (e) => {
        setSelect(e.currentTarget.value);
    }

    const modules = useMemo(() => ({
        toolbar: {
            container: [
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{size: ["small", "false", "large", "huge"]}, {color: ["black", "red", "blue"]}],
                [
                    {list: "ordered"},
                    {list: "bullet"},
                    { indent: "-1" },
                    { indent: "+1"},
                    { align: [] },
                ],
                ["image", "video"]
            ]
        }
    }), []);

    return (
        <Main>
            <div style={{width : "100%", height : "100px", backgroundColor: "black", marginBottom : "50px", padding: "0px 10px"}}></div>
            <MainBox>
                <div className="header-content">
                    <select className="select select-category" onChange={selectChange}>
                        <option>게시판을 선택해 주세요.</option>
                        <option value="1">커뮤니티</option>
                        <option value="2">분실</option>
                        <option value="3">시터</option>
                        <option value="4">병원 정보</option>
                    </select>
                    {select == null ? <div></div> 
                    : select == 1 ? <CommunityPost rank3={setRank3()}/> 
                    : select == 2 ? <LostPost rank3={setRank3}/> 
                    : select == 3 ? <SitterPost setRank1={setRank1} setRank2={setRank2} setRank3={setRank3} />
                    : <HospitalPost rank1={setRank1} rank2={setRank2} rank3={setRank3}/>}               
                </div>
                <div className="main-content">
                    <ReactQuill 
                    style={{"width" : "100%", "height" : "500px"}} 
                    modules={modules} 
                    theme="snow"
                    onChange={InputDescHandler}
                    placeholder="내용을 입력해 주세요."/>
                            
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