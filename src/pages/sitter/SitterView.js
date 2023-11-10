import styled from "styled-components";
import Img from "../../resources/kero.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getReviews, getBoardView, deleteSitterBoard, deleteReview, addReview } from "../../api/sitter";
import { addBookmarkAPI } from "../../api/bookmark";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTokenCookie } from "../../api/cookie";
import { userLogout } from "../../components/store/userSlice";
import banner from "../../resources/bannerTest.png";

const Main = styled.div`
    display: flex;
    margin: 0px 40px;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
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
            margin-left: 10px;
            margin-bottom: 20px;

            .main-header_end-user {
                display: flex;

                .main-header_end-user_info {
                    margin-left: 20px;

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

                        #ratings {
                            margin-top: 3px;
                        }

                        #nickname {
                            border: 1px solid #DEDEDE;
                            border-radius: 5px;
                            padding: 5px;
                            font-size: 0.9rem;
                        }
                    }
                }

                .main-header_end-user_info_loc {
                    font-size: 0.9rem;
                    background-color: #999;
                    color: #FFF;
                    padding: 5px;
                    border-radius: 5px;
                }               
            }

            .main-header_end-bookmark {

                button {
                    border: none;
                    background: none;
                    cursor: pointer;
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

    .main-button {
        display: flex;
        justify-content: flex-end;
        margin-top: 20px;
        width: 100%;

        .update {
            cursor: pointer;
            margin-right: 10px;
            width: 80px;
            height: 30px;
            background-color: #86AEA0;
            border: none;
            border-radius: 5px;
            color: white;
        }

        .delete {
            cursor: pointer;
            background-color: #86A2AE;
            border: none;
            border-radius: 5px;
            width: 80px;
            height: 30px;
            color: white;
            margin-right: 10px;
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

                .review-content_start-user-img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50px;
                    object-fit: cover;
                }

                .review-content_start-user {
                    display: flex;
                    flex-direction: column;
                    margin-left: 10px;
                    width: 20%;                    

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

                    .review-content_start-delete {
                        border: none;
                        background-color: #F5F5F5;
                        color: #999;
                        cursor: pointer;
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
const StarArray = styled.div`
        display: flex;
`

const Star = ({color1, color2, color3, color4, color5}) => {
    return (
        <StarArray>
            <p><FontAwesomeIcon icon={faStar} style={{color: color1}}/></p>
            <p><FontAwesomeIcon icon={faStar} style={{color: color2}}/></p>
            <p><FontAwesomeIcon icon={faStar} style={{color: color3}}/></p>
            <p><FontAwesomeIcon icon={faStar} style={{color: color4}}/></p>
            <p><FontAwesomeIcon icon={faStar} style={{color: color5}}/></p>
        </StarArray>
    )
}

const SitterView = () => {
    const { code } = useParams();
    const navigator = useNavigate();
    const [boardView, setBoardView] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [reviewDesc, setReviewDesc] = useState("");
    const [star, setStar] = useState(0);
    const dispatch = useDispatch();

    const data = useSelector((state) => {
        if (getTokenCookie() !== undefined) {
          if (state.user.user) {
            if(state.user.user == {})
            {
              return JSON.parse(localStorage.getItem("user")); 
            }
            return state.user;
          } else {
            return JSON.parse(localStorage.getItem("user"));
          }
        } else {
          if (localStorage.getItem("user")) {
            dispatch(userLogout());
          }
        }
      });
    
    const styleGray = {
        color: "#aaa"
    };

    const styleOrange = {
        color: "orange"
    };

    const [style1, setStyle1] = useState(styleGray);
    const [style2, setStyle2] = useState(styleGray);
    const [style3, setStyle3] = useState(styleGray);
    const [style4, setStyle4] = useState(styleGray);
    const [style5, setStyle5] = useState(styleGray);

    const starStyles = [style1, style2, style3, style4, style5];


    const onRatings = (event) => {
        switch(eval(event.currentTarget.value)) {
            case 1:
                setStyle1(styleOrange);
                setStyle2(styleGray);
                setStyle3(styleGray);
                setStyle4(styleGray);
                setStyle5(styleGray);
                setStar(1);
                break;
            case 2:
                setStyle1(styleOrange);
                setStyle2(styleOrange);
                setStyle3(styleGray);
                setStyle4(styleGray);
                setStyle5(styleGray);
                setStar(2);
                break;
            case 3:
                setStyle1(styleOrange);
                setStyle2(styleOrange);
                setStyle3(styleOrange);
                setStyle4(styleGray);
                setStyle5(styleGray);
                setStar(3);
                break;
            case 4:
                setStyle1(styleOrange);
                setStyle2(styleOrange);
                setStyle3(styleOrange);
                setStyle4(styleOrange);
                setStyle5(styleGray);
                setStar(4);
                break;
            case 5:
                setStyle1(styleOrange);
                setStyle2(styleOrange);
                setStyle3(styleOrange);
                setStyle4(styleOrange);
                setStyle5(styleOrange);
                setStar(5);
                break;
        }
    }

    const onReviewEnroll = async () => {
        if(boardView?.memberDTO.id != data?.id) {
            const formData = new FormData();
            formData.append("member.id", data?.id);
            formData.append("sitterReviewRatings", star);
            formData.append("sitterReviewDesc", reviewDesc);
            formData.append("sitter.sitterCode", code);
            const result = await addReview(formData);
            setReviews([result.data, ...reviews]);
            setReviewDesc('');

        } else {
            window.alert('자신의 글에는 리뷰를 등록할 수 없습니다.');
        }
    }

    const onBookMarkBtn = async () => {
        const formData = {
            boardName: 'sitter',
            postCode: code,
            token: data?.token,
        }
        const result = await addBookmarkAPI(formData);
        if(!result.data) {
            alert('이미 북마크에 등록되었습니다.')
        } else alert('북마크에 등록되었습니다.');
    };

    const boardViewAPI = async () => {
        const boardViewResult = await getBoardView(code);
        setBoardView(boardViewResult.data);
    }

    const getReviewsAPI = async () => {
        const reviewsResult = await getReviews(boardView?.memberDTO?.id);
        setReviews([...reviews, ...reviewsResult.data]);
    }

    const onUpdateBoard = () => {
        const codeView = code;
        navigator(`../${codeView}/update/3`);
    }

    const onDeleteBoard = async () => {
        const response = window.confirm('정말로 삭제하시겠습니까?');
        if(response) {
           await deleteSitterBoard(code);
           alert('삭제되었습니다.');
        }
        navigator('../');
    }

    const onDeleteReview = async (e) => {
        const response = window.confirm('정말로 삭제하시겠습니까?');
        if(response) {
            const id = e.currentTarget.value;
            await deleteReview(id);
            alert('삭제되었습니다.');
            const newList = reviews.filter((item) => item.sitterReviewCode != id);
            setReviews(newList);
        }   
    }

    const reviewDescChange = (e) => {
        setReviewDesc(e.currentTarget.value);    
    }

    useEffect(() => {
        boardViewAPI();
    }, []);

    useEffect(() => {
        if(boardView) {
            getReviewsAPI();
        }
    }, [boardView]);

    return (
        <Main>
            <img src={banner} style={{width: "100%", height: "150px", marginBottom: "30px", objectFit: "cover"}}/>
            <MainBox>
                <MainContent>
                    <div className="main-header" key={boardView?.boardCode}>
                        <div className="main-header_start">
                            <p id="sitterTitle">{boardView?.title}</p>
                        </div>
                        <div className="main-header_end">
                            <div className="main-header_end-user">
                                <img src={boardView?.memberDTO.memberImg !== null ? boardView?.memberDTO.memberImg : Img} style={{width : "100px", height: "100px", objectFit: "cover"}}/>
                                <div className="main-header_end-user_info">
                                    <div className="main-header_end-user_info-name">
                                        <p id="nickname">{boardView?.memberDTO.nickname}</p>
                                        <p id="ratings"><FontAwesomeIcon icon={faStar} style={{color: "orange"}}/><span>{boardView?.sitterRatings}</span></p>
                                    </div>
                                    <div className="main-header_end-user_info_loc">
                                        <p>{boardView?.sitterLoc}</p>
                                    </div>
                                </div>                               
                            </div>
                            <div className="main-header_end-bookmark">
                                <button onClick={onBookMarkBtn}>
                                    <FontAwesomeIcon icon={faBookmark} style={{fontSize: "2rem", color: "#ddd", marginRight: "10px"}} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="main-content">
                        <div className='ql-editor' id="sitterDesc" dangerouslySetInnerHTML={{__html: String(boardView?.desc)}} />
                    </div>
                    {boardView?.memberDTO.id == data?.id ? 
                        <div className="main-button">
                            <button className="update" onClick={onUpdateBoard}>수정</button>
                            <button className="delete" onClick={onDeleteBoard}>삭제</button>
                        </div> : <div></div>
                    }                    
                </MainContent>
                <ReviewContent>
                    <div className="write">
                        <div className="writer-header">
                            <p>시터 후기 작성하기</p>
                        </div>
                        <div className="write-content">
                            <div className="write-content_header">      
                                <img src={data?.memberImg !== null ? data?.memberImg : Img} style={{width : "50px", height: "50px", borderRadius: "50px", objectFit: "cover"}}/>
                                <div className="write-content_header-start">
                                    <div className="write-content_header-start_name">
                                        <p id="nickname">{data?.nickname}</p>
                                    </div>
                                    <div className="write-content_header-start_ratings">
                                        {starStyles.map((style, i) => (
                                            <button key={i + 1} onClick={onRatings} value={i + 1}><FontAwesomeIcon icon={faStar} style={style}/></button>
                                        ))}
                                    </div>
                                </div>                               
                            </div>
                            <input type="text" id="sitterReviewDesc" onChange={reviewDescChange} value={reviewDesc} />
                            <div className="write-content_center-button">
                                <button onClick={onReviewEnroll}>등록</button>
                            </div>                       
                        </div>
                    </div>
                    <div className="review">
                        <div className="review-header">
                            <p>시터 후기</p>
                        </div>
                        {reviews.map((items) => (
                        <div className="review-content" key={items?.sitterReviewCode}>
                            <div className="review-content_start">
                                <img src={items?.member.memberImg !== null ? items.member?.memberImg : Img} className="review-content_start-user-img"/>
                                <div className="review-content_start-user">
                                    <div className="review-content_start-user_name">
                                        <p id="nickname">{items?.member.nickname}</p>
                                        {items?.member.id == data?.id ? 
                                        <button className="review-content_start-delete" onClick={onDeleteReview} value={items?.sitterReviewCode}>삭제</button> :
                                        <div></div>
                                    }
                                    </div>
                                    <div className="review-content_start-user_ratings">
                                       {items.sitterReviewRatings == 5 ? (<Star color1="orange" color2="orange" color3="orange" color4="orange" color5="orange" />) 
                                       : items.sitterReviewRatings == 4 ? (<Star color1="orange" color2="orange" color3="orange" color4="orange" color5="#aaa"/>) 
                                       : items.sitterReviewRatings == 3 ? (<Star color1="orange" color2="orange" color3="orange" color4="#aaa" color5="#aaa"/>) 
                                       : items.sitterReviewRatings == 2 ? (<Star color1="orange" color2="orange" color3="#aaa" color4="#aaa" color5="#aaa"/>) 
                                       : (<Star color1="orange" color2="#aaa" color3="#aaa" color4="#aaa" color5="#aaa"/>)}                           
                                    </div>
                                </div>
                                <div className="review-content_main">
                                    <p id="sitterReviewDesc">{items?.sitterReviewDesc}</p>
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