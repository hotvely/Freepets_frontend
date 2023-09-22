import styled from "styled-components";
import { faBackward, faCaretDown, faComments, faEye, faForward, faMagnifyingGlass, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    flex-direction: column;
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
`

const ProductReview = () => {
    return (
        <Main>
            <div style={{width : "100%", height : "100px", backgroundColor: "black", marginBottom : "50px", padding: "0px 10px"}}></div>
            <MainBox>
                <MainHeader>                    
                    <div>
                        <label htmlFor="search">용품 후기</label>
                        <FontAwesomeIcon icon={faCaretDown} />
                        <input type="search" id="search" name="search"/>
                        <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
                    <select>
                        <option value="1">추천순</option>
                        <option value="2">댓글순</option>
                        <option value="3">조회수</option>
                    </select>
                    <button className="button-write">글쓰기</button>
                </MainHeader>
                <MainContent>
                    <section>
                        <a href="#">
                            <h2>우리 집 강아지가 엄청 좋아하는 장난감</h2>
                            <h3><span id="image">사진</span>임지우</h3>
                            <p><span>7일</span> 전</p>
                            <p><FontAwesomeIcon icon={faThumbsUp}/><span id="like">50</span> <FontAwesomeIcon icon={faEye}/><span id="views">150</span> <FontAwesomeIcon icon={faComments}/><span id="comment">30</span></p>
                        </a>
                        <a href="#">
                            <h2>우리 집 강아지가 엄청 좋아하는 장난감</h2>
                            <h3><span id="image">사진</span>임지우</h3>
                            <p><span>7일</span> 전</p>
                            <p><FontAwesomeIcon icon={faThumbsUp}/><span id="like">50</span> <FontAwesomeIcon icon={faEye}/><span id="views">150</span> <FontAwesomeIcon icon={faComments}/><span id="comment">30</span></p>
                        </a>
                        <a href="#">
                            <h2>우리 집 강아지가 엄청 좋아하는 장난감</h2>
                            <h3><span id="image">사진</span>임지우</h3>
                            <p><span>7일</span> 전</p>
                            <p><FontAwesomeIcon icon={faThumbsUp}/><span id="like">50</span> <FontAwesomeIcon icon={faEye}/><span id="views">150</span> <FontAwesomeIcon icon={faComments}/><span id="comment">30</span></p>
                        </a>
                        <a href="#">
                            <h2>우리 집 강아지가 엄청 좋아하는 장난감</h2>
                            <h3><span id="image">사진</span>임지우</h3>
                            <p><span>7일</span> 전</p>
                            <p><FontAwesomeIcon icon={faThumbsUp}/><span id="like">50</span> <FontAwesomeIcon icon={faEye}/><span id="views">150</span> <FontAwesomeIcon icon={faComments}/><span id="comment">30</span></p>
                        </a>
                        <a href="#">
                            <h2>우리 집 강아지가 엄청 좋아하는 장난감</h2>
                            <h3><span id="image">사진</span>임지우</h3>
                            <p><span>7일</span> 전</p>
                            <p><FontAwesomeIcon icon={faThumbsUp}/><span id="like">50</span> <FontAwesomeIcon icon={faEye}/><span id="views">150</span> <FontAwesomeIcon icon={faComments}/><span id="comment">30</span></p>
                        </a>
                        <a href="#">
                            <h2>우리 집 강아지가 엄청 좋아하는 장난감</h2>
                            <h3><span id="image">사진</span>임지우</h3>
                            <p><span>7일</span> 전</p>
                            <p><FontAwesomeIcon icon={faThumbsUp}/><span id="like">50</span> <FontAwesomeIcon icon={faEye}/><span id="views">150</span> <FontAwesomeIcon icon={faComments}/><span id="comment">30</span></p>
                        </a>
                        <a href="#">
                            <h2>우리 집 강아지가 엄청 좋아하는 장난감</h2>
                            <h3><span id="image">사진</span>임지우</h3>
                            <p><span>7일</span> 전</p>
                            <p><FontAwesomeIcon icon={faThumbsUp}/><span id="like">50</span> <FontAwesomeIcon icon={faEye}/><span id="views">150</span> <FontAwesomeIcon icon={faComments}/><span id="comment">30</span></p>
                        </a>
                        <a href="#">
                            <h2>우리 집 강아지가 엄청 좋아하는 장난감</h2>
                            <h3><span id="image">사진</span>임지우</h3>
                            <p><span>7일</span> 전</p>
                            <p><FontAwesomeIcon icon={faThumbsUp}/><span id="like">50</span> <FontAwesomeIcon icon={faEye}/><span id="views">150</span> <FontAwesomeIcon icon={faComments}/><span id="comment">30</span></p>
                        </a>
                        <a href="#">
                            <h2>우리 집 강아지가 엄청 좋아하는 장난감</h2>
                            <h3><span id="image">사진</span>임지우</h3>
                            <p><span>7일</span> 전</p>
                            <p><FontAwesomeIcon icon={faThumbsUp}/><span id="like">50</span> <FontAwesomeIcon icon={faEye}/><span id="views">150</span> <FontAwesomeIcon icon={faComments}/><span id="comment">30</span></p>
                        </a>
                    </section>
                </MainContent>
            </MainBox>
            <div>
                <FontAwesomeIcon icon={faBackward} />
                <button>5</button>
                <button>6</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <FontAwesomeIcon icon={faForward} />
            </div>
        </Main>
    )
}

export default ProductReview;