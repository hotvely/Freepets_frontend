import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px;
  background-color: aliceblue;
`;

const HeadImg = styled.div`
  width: 100%;
  height: 80px;
  border: 1px solid;
  background-color: antiquewhite;
`;

const MainArea = styled.div`
  &.media-header {
    margin-top: 30px;
    width: 100%;
    height: 100vh;
    border: 1px solid #68b0c9;
    background-color: blueviolet;
  }
`;

const MainContent = styled.main`
  &.media-main {
    background-color: coral;
    border: 1px solid #68b0c9;
    margin: 20px 20px 20px;
    height: 85vh;

    .content-area {
      background-color: darkseagreen;
      width: 25%;
      margin: 10px;
    }
  }
`;

const Media = () => {
  return (
    <Container>
      <HeadImg>
        <h1>배너 이미지 들어갈 곳</h1>
      </HeadImg>

      <MainArea className="media-header">
        <div className="midea-headerbox">
          <div className="media-sort-like">
            <select>
              <option value="1" selected>
                최신순
              </option>
              <option value="2">추천순</option>
              <option value="3">댓글순</option>
              <option value="4">조회순</option>
            </select>
          </div>

          <div className="media-sort-category">
            {/* <label htmlFor="category">말머리</label> 
           나중에 말머리 클릭했을 때 셀렉트 나오게 다시 설정하기
          */}
            <select className="category">
              <option value="1" selected>
                모든펫츠
              </option>
              <option value="2">반려펫츠</option>
              <option value="3">스트릿펫츠</option>
              <option value="4">찾아줘요펫츠</option>
            </select>
          </div>

          <div className="searchbox">
            <select>
              <option value="1">게시글+댓글</option>
              <option value="2">게시글</option>
              <option value="3">댓글</option>
            </select>

            <input type="search" id="search" name="search" />
            <button>검색</button>
          </div>
        </div>

        <MainContent className="media-main">
          <div className="content-area">
            <div id="media-thumbnail">
              <a href="#">
                <img src="./resources/pebbleTV.jpg" alt="미디어썸네일" />
              </a>
            </div>

            <div id="media-info">
              <div id="media-info-title">
                <a href="#">
                  <h3>노릇노릇 군밤이</h3>
                </a>
                <a href="#">
                  <p>
                    [<span>7</span>]
                  </p>
                </a>
              </div>

              <div id="media-info-writer">
                <p>알밤이</p>
              </div>

              <div id="media-info-detail">
                <p>
                  <span>2023.09.22</span>ㆍ조회수
                  <span id="viewCount">22</span>회
                </p>
              </div>
            </div>
          </div>

          <div className="content-area">
            <div id="media-thumbnail">
              <a href="#">
                <img src="./resources/pebbleTV.jpg" alt="미디어썸네일" />
              </a>
            </div>

            <div id="media-info">
              <div id="media-info-title">
                <a href="#">
                  <h3>노릇노릇 군밤이</h3>
                </a>
                <a href="#">
                  <p>
                    [<span>7</span>]
                  </p>
                </a>
              </div>

              <div id="media-info-writer">
                <p>알밤이</p>
              </div>

              <div id="media-info-detail">
                <p>
                  <span>2023.09.22</span>ㆍ조회수
                  <span id="viewCount">22</span>회
                </p>
              </div>
            </div>
          </div>

          <div className="content-area">
            <div id="media-thumbnail">
              <a href="#">
                <img src="./resources/pebbleTV.jpg" alt="미디어썸네일" />
              </a>
            </div>

            <div id="media-info">
              <div id="media-info-title">
                <a href="#">
                  <h3>노릇노릇 군밤이</h3>
                </a>
                <a href="#">
                  <p>
                    [<span>7</span>]
                  </p>
                </a>
              </div>

              <div id="media-info-writer">
                <p>알밤이</p>
              </div>

              <div id="media-info-detail">
                <p>
                  <span>2023.09.22</span>ㆍ조회수
                  <span id="viewCount">22</span>회
                </p>
              </div>
            </div>
          </div>

          <div className="content-area">
            <div id="media-thumbnail">
              <a href="#">
                <img src="./resources/pebbleTV.jpg" alt="미디어썸네일" />
              </a>
            </div>

            <div id="media-info">
              <div id="media-info-title">
                <a href="#">
                  <h3>노릇노릇 군밤이</h3>
                </a>
                <a href="#">
                  <p>
                    [<span>7</span>]
                  </p>
                </a>
              </div>

              <div id="media-info-writer">
                <p>알밤이</p>
              </div>

              <div id="media-info-detail">
                <p>
                  <span>2023.09.22</span>ㆍ조회수
                  <span id="viewCount">22</span>회
                </p>
              </div>
            </div>
          </div>
        </MainContent>
      </MainArea>
    </Container>
  );
};

export default Media;
