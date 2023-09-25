import styled from "styled-components";
import { faMagnifyingGlass, faCaretDown, faStar, faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Img from "../../resources/kero.jpeg";

const Main = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    flex-direction: column;

    .page {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        display: flex;
        align-items: center;

        .page-btn {
            margin: 0px 10px;
            
            button {
                width: 35px;
                height: 35px;
                border: none;
                border-radius: 5px;
                margin: 0px 5px;
            }
        }
        
    }
`

const MainBox = styled.div`
    padding: 20px 10px;
    width : 100%;
    border : 1px solid #B1DEEC;
`

const MainHeader = styled.header`
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 20px;
    display: flex;
    justify-content: space-between;

    .header-end {       
        display: flex;
        background-color: #EDEDED;
        align-items: center;
        border-radius: 10px;
        height: 30px;

        .header-end-label {
            margin-right: 5px;
            padding-left: 10px;

            label {
                font-size: 0.8rem;
                font-weight: bold;
                color: #3a98b9;
                margin-right: 5px;
            }
        }
        
        #search {
            background-color: #EDEDED;
            border: none;
        }

        button {
            border: none;
            cursor: pointer;
        }
    }

    select {
        width: 90px;
        height: 30px;
        text-align: center;
        border: none;
        border-radius: 10px;
        color: #3a98b9;
        font-size: 0.8rem;
        font-weight: bold;
        background-color: #EDEDED;
    }

    .button-write {
        width: 90px;
        height: 30px;
        border: none;
        margin-left: 10px;
        border-radius: 10px;
        color: #3a98b9;
        font-size: 0.8rem;
        font-weight: bold;
        background-color: #EDEDED;
    }
    
`

const MainContent = styled.main`

    section {
        margin: 10px;
    }

    .main-content {
        padding: 20px 10px;
        border-bottom: 1px solid #EDEDED;

        a {
            display: flex;
            justify-content: space-between;

            .main-content_start {
                display: flex;

                .main-content_start-desc {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    margin-left: 20px;

                    div {
                        #sitterTitle {
                            font-weight: bold;
                            margin-bottom: 10px;
                        }        
                    }

                    .main-content_start-desc-name {
                        display: flex;

                        #nickname {
                            padding: 5px;
                            border: 1px solid #DEDEDE;
                            border-radius: 5px;
                            font-size: 0.8rem;
                        }
                    }                                       
                }
            }           

            .main-content_end {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-right: 5px;

                p {
                    font-size: 1.5rem;
                    color: orange;
                    -webkit-text-stroke: 1px orange;

                    #sitterPrice {
                        margin-right: 5px;                  
                    }                  
                }

                button {
                    width: 100px;
                    padding: 5px;
                    border: 1px solid #3a98b9;
                    border-radius: 5px;
                    background-color: white;
                    color: #3a98b9;
                    cursor: pointer;
                    font-weight: bold;           
                }
            }
        }
    }

`

const Sitter = () => {
    return (
        <Main>
            <div style={{width : "100%", height : "100px", backgroundColor: "black", marginBottom : "50px", padding: "0px 10px"}}></div>
            <MainBox>
                <MainHeader>
                    <div className="header-start">
                        <select>
                            <option value="1">추천순</option>
                            <option value="2">리뷰순</option>
                            <option value="3">낮은 비용</option>
                        </select>
                        <button className="button-write">글쓰기</button>
                    </div>                 
                    <div className="header-end">
                        <div className="header-end-label">
                            <label htmlFor="search">시터 조회</label>
                            <FontAwesomeIcon icon={faCaretDown} style={{color: "#3a98b9"}}/>
                        </div>
                        <input type="search" id="search" name="search"/>
                        <button><FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#3a98b9"}}/></button>                       
                    </div>                                      
                </MainHeader>
                <MainContent>
                    <section>
                        <div className="main-content">
                            <a href="#">
                                <div className="main-content_start">
                                    <img src={Img} style={{width: "100px", height: "100px", objectFit: "cover"}}></img>
                                    <div className="main-content_start-desc">
                                        <div>
                                            <p id="sitterTitle">저는 동물 훈련사 자격증이 있습니다 믿고 맡겨 주세요!</p>
                                            <p><FontAwesomeIcon icon={faStar} style={{color: "orange"}}/> <span>4.5</span></p>
                                        </div>
                                        <div className="main-content_start-desc-name">
                                            <p id="nickname">케로</p>
                                        </div>
                                    </div>
                                </div>                               
                                <div className="main-content_end">
                                    <p><span id="sitterPrice">80000</span>₩</p>
                                    <button>1:1 대화</button>
                                </div>
                            </a>
                        </div>
                        <div className="main-content">
                            <a href="#">
                                <div className="main-content_start">
                                    <img src={Img} style={{width: "100px", height: "100px", objectFit: "cover"}}></img>
                                    <div className="main-content_start-desc">
                                        <div>
                                            <p id="sitterTitle">저는 동물 훈련사 자격증이 있습니다 믿고 맡겨 주세요!</p>
                                            <p><FontAwesomeIcon icon={faStar} style={{color: "orange"}}/> <span>4.5</span></p>
                                        </div>
                                        <div className="main-content_start-desc-name">
                                            <p id="nickname">케로</p>
                                        </div>
                                    </div>
                                </div>                               
                                <div className="main-content_end">
                                    <p><span id="sitterPrice">150000</span>₩</p>
                                    <button>1:1 대화</button>
                                </div>
                            </a>
                        </div>
                        <div className="main-content">
                            <a href="#">
                                <div className="main-content_start">
                                    <img src={Img} style={{width: "100px", height: "100px", objectFit: "cover"}}></img>
                                    <div className="main-content_start-desc">
                                        <div>
                                            <p id="sitterTitle">저는 동물 훈련사 자격증이 있습니다 믿고 맡겨 주세요!</p>
                                            <p><FontAwesomeIcon icon={faStar} style={{color: "orange"}}/> <span>4.5</span></p>
                                        </div>
                                        <div className="main-content_start-desc-name">
                                            <p id="nickname">케로</p>
                                        </div>
                                    </div>
                                </div>                               
                                <div className="main-content_end">
                                    <p><span id="sitterPrice">80000</span>₩</p>
                                    <button>1:1 대화</button>
                                </div>
                            </a>
                        </div>
                        <div className="main-content">
                            <a href="#">
                                <div className="main-content_start">
                                    <img src={Img} style={{width: "100px", height: "100px", objectFit: "cover"}}></img>
                                    <div className="main-content_start-desc">
                                        <div>
                                            <p id="sitterTitle">저는 동물 훈련사 자격증이 있습니다 믿고 맡겨 주세요!</p>
                                            <p><FontAwesomeIcon icon={faStar} style={{color: "orange"}}/> <span>4.5</span></p>
                                        </div>
                                        <div className="main-content_start-desc-name">
                                            <p id="nickname">케로</p>
                                        </div>
                                    </div>
                                </div>                               
                                <div className="main-content_end">
                                    <p><span id="sitterPrice">80000</span>₩</p>
                                    <button>1:1 대화</button>
                                </div>
                            </a>
                        </div>
                        <div className="main-content">
                            <a href="#">
                                <div className="main-content_start">
                                    <img src={Img} style={{width: "100px", height: "100px", objectFit: "cover"}}></img>
                                    <div className="main-content_start-desc">
                                        <div>
                                            <p id="sitterTitle">저는 동물 훈련사 자격증이 있습니다 믿고 맡겨 주세요!</p>
                                            <p><FontAwesomeIcon icon={faStar} style={{color: "orange"}}/> <span>4.5</span></p>
                                        </div>
                                        <div className="main-content_start-desc-name">
                                            <p id="nickname">케로</p>
                                        </div>
                                    </div>
                                </div>                               
                                <div className="main-content_end">
                                    <p><span id="sitterPrice">80000</span>₩</p>
                                    <button>1:1 대화</button>
                                </div>
                            </a>
                        </div>
                    </section>
                </MainContent>
            </MainBox>
            <div className="page">
                <FontAwesomeIcon icon={faCaretLeft} style={{fontSize: "2.5rem", color: "#aaa"}}/>
                <div className="page-btn">
                    <button>5</button>
                    <button>6</button>
                    <button>7</button>
                    <button>8</button>
                    <button>9</button>
                </div>
                <FontAwesomeIcon icon={faCaretRight} style={{fontSize: "2.5rem", color: "#aaa"}}/>
            </div>
        </Main>
    )
}

export default Sitter;