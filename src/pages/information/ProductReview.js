import styled from "styled-components";
import { faCaretDown, faComments, faEye, faMagnifyingGlass, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Main = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
`

const MainBox = styled.div`
    padding: 20px 10px;
    width : 1200px;
    border : 1px solid #B1DEEC;
`

const MainHeader = styled.header`
    padding-left: 10px;
    padding-right: 10px;
    padding-bottom: 20px;

    select {
        padding: 8px 15px;
        border: none;
        border-radius: 10px;
        color: #3a98b9;
        font-size: 0.8rem;
        font-weight: bold;
        background-color: #EDEDED;

        option {
            padding: 10px 0;
        }

    }
`

const MainContent = styled.main`
`

const ProductReview = () => {
    return (
        <Main>
            <MainBox>
                <MainHeader>
                    <select>
                        <option value="1">추천순</option>
                        <option value="2">댓글순</option>
                        <option value="3">조회수</option>
                    </select>

                    <div>
                        <label htmlFor="search">용품 후기</label>
                        <FontAwesomeIcon icon={faCaretDown} />
                        <input type="search" id="search" name="search"/>
                        <button><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                    </div>
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
                        <a href="#">
                            <h2>우리 집 강아지가 엄청 좋아하는 장난감</h2>
                            <h3><span id="image">사진</span>임지우</h3>
                            <p><span>7일</span> 전</p>
                            <p><FontAwesomeIcon icon={faThumbsUp}/><span id="like">50</span> <FontAwesomeIcon icon={faEye}/><span id="views">150</span> <FontAwesomeIcon icon={faComments}/><span id="comment">30</span></p>
                        </a>
                    </section>
                </MainContent>
            </MainBox>
        </Main>
    )
}

export default ProductReview;