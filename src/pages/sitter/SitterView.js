import styled from "styled-components";
import Img from "../../resources/kero.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getBoardView, getReviews } from "../../api/sitter";
import { useLocation } from "react-router-dom";

const Main = styled.div`
    display: flex;
    margin: 0px 40px;
    width: 100%;
    height: 100%;
    justify-content: center;
    flex-direction: column;
`
const MainBox = styled.div`
    padding: 20px 10px;
    width : 100%;
    border : 1px solid #B1DEEC;
    display: flex;
    flex-direction: column;
`
const MainContent = styled.div`
    padding: 10px;
    padding-bottom: 30px;
    margin-bottom: 20px;
    border-bottom: 2px solid #eee;

    .main-header {
        display: flex;
        flex-direction: column;

        .main-header_start {
            margin-left: 10px;
            margin-bottom: 25px;

            #sitterTitle {
                font-weight: bold;
                font-size: 1.2rem;
                text-shadow: -1px 0 #ddd, 0 1px #ddd, 1px 0 #ddd, 0 -1px #ddd;
            }
        }

        .main-header_end {
            display: flex;
            justify-content: space-between;

            .main-header_end-user {
                display: flex;

                .main-header_end-user_info {
                    margin-left: 10px;

                    .main-header_end-user_info-name {
                        display: flex;
                        margin-bottom: 10px;

                        p {
                            margin-right: 5px;

                            span {
                                margin-left: 5px;
                                font-size: 0.9rem;
                            }
                        }

                        #nickname {
                            border: 1px solid #DEDEDE;
                            border-radius: 5px;
                            padding: 3px;
                            font-size: 0.9rem;
                        }
                    }
                }

                .main-header_end-user_info_loc {
                    font-size: 0.9rem;
                    background-color: #999;
                    color: #FFF;
                    padding: 3px;
                    border-radius: 5px;
                }               
            }
        }
    }

    .main-content {
        border: 1px solid #DEDEDE;
        margin-top: 20px;
        padding: 10px;
        font-size: 0.9rem;

        #sitterDesc {
            line-height: 20px;
        }
    }
`
const ReviewContent = styled.div`

    .write {
        margin: 5px;

        .writer-header {
            display: flex;

            p {
                margin: 10px;
                font-size: 0.9rem;
                border-radius: 5px;
                padding: 5px;
                border-bottom: 2px solid #98DBF2;
            }
        }

        .write-content {
            display: flex;
            flex-direction: column;

            .write-content_header {
                display: flex;
                margin: 10px;

                .write-content_header-start {
                    
                    margin-left: 10px;
                    display: flex;
                    flex-direction: column;

                    .write-content_header-start_name {
                        display: flex;

                        #nickname {
                            font-size: 0.9rem;
                            border: 1px solid #DEDEDE;
                            border-radius: 5px;
                            margin-bottom: 5px;
                            padding: 3px;

                        }
                    }

                    .write-content_header-start_ratings {

                        button {
                            background-color: white;
                            border: none;
                            font-size: 1rem;
                        }
                    }
                }
            }               
        }
    }

        #sitterReviewDesc {
            border: 1px solid #eee;
            padding: 10px;
            margin: 10px;
            font-size: 0.8rem;
        }

        .write-content_center-button {
            display: flex;
            justify-content: center;

            button {
                width: 150px;
                height: 30px;
                border: none;
                border-radius: 5px;
                background-color: #98DBF2;
                color: white;
                cursor: pointer;
            }
        }
    

    .review {
        margin: 10px;
        display: flex;
        flex-direction: column;

        .review-header {
            display: flex;

            p {
                margin: 10px;
                font-size: 0.9rem;
                border-radius: 5px;
                padding: 5px;
                border-bottom: 2px solid #98DBF2;
            }
        }

        .review-content {
            background-color: #F5F5F5;
            border-radius: 5px;
            margin-bottom: 10px;

            .review-content_start {
                padding: 10px;
                display: flex;

                .review-content_start-user {
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;

                    .review-content_start-user_name {
                        display: flex;

                        #nickname {
                            font-size: 0.9rem;
                            border: 1px solid #000;
                            border-radius: 5px;
                            padding: 3px;
                        }
                    }
                    
                    .review-content_start-user_ratings {
                        display: flex;
                        margin-top: 5px;
                    }
                }

                .review-content_main {
                    width: 100%;
                    margin-left: 10px;
                    
                    #sitterReviewDesc {
                        background-color: #fff;
                    }
                }
            }
        }
    }

`

const Star = ({color1, color2, color3, color4, color5}) => {
    return (
        <div>
            <p><FontAwesomeIcon icon={faStar} style={{color: color1}}/></p>
            <p><FontAwesomeIcon icon={faStar} style={{color: color2}}/></p>
            <p><FontAwesomeIcon icon={faStar} style={{color: color3}}/></p>
            <p><FontAwesomeIcon icon={faStar} style={{color: color4}}/></p>
            <p><FontAwesomeIcon icon={faStar} style={{color: color5}}/></p>
        </div>
    )
}

const SitterView = () => {
    const [star, setStar] = useState("");
    const location = useLocation();
    const [boardView, setBoardView] = useState(null);
    const [reviews, setReviews] = useState([]);

    const onRatings = (event) => {
        const color = event.target.style.color;
        console.log(color);
    }

    const boardViewAPI = async () => {
        const boardViewResult = await getBoardView(location.state);
        setBoardView(boardViewResult.data);
    }

    const getReviews = async () => {
        const reviewsResult = await getReviews(boardView?.member.id);
        setReviews([...reviews, ...reviewsResult.data])
    }

    useEffect(() => {
        boardViewAPI();
        getReviews();
        const data = JSON.parse(localStorage.getItem('user'));
        console.log(data.id);
        
    }, []);

    return (
        <Main>
            <div style={{width : "100%", height : "100px", backgroundColor: "black", marginBottom : "50px", padding: "0px 10px"}}></div>
            <MainBox>
                <MainContent>
                    <div className="main-header" key={boardView?.sitterCode}>
                        <div className="main-header_start">
                            <p id="sitterTitle">{boardView?.sitterTitle}</p>
                        </div>
                        <div className="main-header_end">
                            <div className="main-header_end-user">
                                <img src={Img} style={{width : "100px", height: "100px", objectFit: "cover"}}/>
                                <div className="main-header_end-user_info">
                                    <div className="main-header_end-user_info-name">
                                        <p id="nickname">{boardView?.member.nickname}</p>
                                        <p><FontAwesomeIcon icon={faStar} style={{color: "orange"}}/><span>{boardView?.sitterRatings}</span></p>
                                    </div>
                                    <div className="main-header_end-user_info_loc">
                                        <p>{boardView?.sitterLoc}</p>
                                    </div>
                                </div>                               
                            </div>
                            <FontAwesomeIcon icon={faBookmark} style={{fontSize: "2rem", color: "#ddd", marginRight: "10px"}} />
                        </div>
                    </div>
                    <div className="main-content">
                        <p id="sitterDesc">{boardView?.sitterDesc}
                        </p>
                    </div>
                </MainContent>
                <ReviewContent>
                    <div className="write">
                        <div className="writer-header">
                            <p>시터 후기 작성하기</p>
                        </div>
                        <div className="write-content">
                            <div className="write-content_header">      
                                <img src={Img} style={{width : "50px", height: "50px", borderRadius: "50px", objectFit: "cover"}}/>
                                <div className="write-content_header-start">
                                    <div className="write-content_header-start_name">
                                        <p id="nickname">베로</p>
                                    </div>
                                    <div className="write-content_header-start_ratings">                                       
                                        <button onClick={onRatings}><FontAwesomeIcon icon={faStar} style={{color: "orange"}}/></button>
                                        <button onClick={onRatings}><FontAwesomeIcon icon={faStar} style={{color: "#aaa"}}/></button>
                                        <button onClick={onRatings}><FontAwesomeIcon icon={faStar} style={{color: "#aaa"}}/></button>
                                        <button onClick={onRatings}><FontAwesomeIcon icon={faStar} style={{color: "#aaa"}}/></button>
                                        <button onClick={onRatings}><FontAwesomeIcon icon={faStar} style={{color: "#aaa"}}/></button>
                                    </div>
                                </div>                               
                            </div>                
                            <div contentEditable="true" id="sitterReviewDesc"></div>
                            <div className="write-content_center-button">
                                <button>등록</button>
                            </div>                       
                        </div>
                    </div>
                    <div className="review">
                        <div className="review-header">
                            <p>시터 후기</p>
                        </div>
                        {reviews.map((items) => (
                        <div className="review-content">
                            <div className="review-content_start">
                                <img src={Img} style={{width : "50px", height: "50px", borderRadius: "50px", objectFit: "cover"}}/>
                                <div className="review-content_start-user">
                                    <div className="review-content_start-user_name">
                                        <p id="nickname">{items.member.nickname}</p>
                                    </div>
                                    
                                </div>
                                <div className="review-content_main">
                                    <p id="sitterReviewDesc">이분 만나고 강아지 사람 됐습니다 강추합니다</p>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </ReviewContent>
            </MainBox>
        </Main>
    )
}

export default SitterView;