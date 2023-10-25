import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import NoticeTableForList from "./NoticeTableForList";
import { getBoardsByPageAPI, getSearchAPI } from "../../api/notice";
import { useNavigate } from "react-router-dom";
import { dateFormatDefault } from "../../api/utils";

const MainStlye = styled.div`
  padding: 20px;
  width: 100%;
`;

const MainBanner = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 30px;

  .banner-img {
    width: 100%;
    img {
      width: 100%;
    }
  }
`;
const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  width: 100%;
  div {
    display: flex;
    justify-content: space-around;
  }
`;

const NoticeList = (props) => {
  const [boards, setBoards] = useState([]);
  const navigate = useNavigate();
  // const [data, setData] = useState([]);
  const [columns, setColumns] = useState([
    { accessor: "noticeCode", Header: "게시글번호" },
    { accessor: "noticeTitle", Header: "제목" },
    { accessor: "nickName", Header: "작성자" },
    { accessor: "noticeDate", Header: "작성일" },
    { accessor: "noticeViewCount", Header: "조회수" },
    { accessor: "noticeLikeCount", Header: "좋아요" },
  ]);
  const page = 1;
  const sortNum = props.props.sortNum;
  const keyword = props.props.searchKey;
  const searchNum = props.props.searchNum;

  // const getBoardHandler = async () => {
  //   const response = await getBoardsByPageAPI(page, sortNum);

  //   setBoards([...response.data.noticeList]);
  //   // setTotalPages(response.data.totalPages);
  // };
  const getBoardHandler = async () => {
    const response = await getBoardsByPageAPI(page, sortNum);

    setBoards([...response.data.noticeList]);
    // setTotalPages(response.data.totalPages);
  };

  const getSearchBoardHandler = async () => {
    // 검색기능..

    const response = await getSearchAPI(keyword, searchNum);

    console.log(response);

    if (response.data.noticeList.length > 0) {
      setBoards(response.data.noticeList);
      console.log(keyword, searchNum);
    } else {
      // await getBoardHandler();
    }
  };

  useEffect(() => {
    console.log(boards);
  }, [boards]);

  useEffect(() => {
    getBoardHandler();
  }, []);

  useEffect(() => {
    console.log("게시글 변경됬따.");
    getBoardHandler();
  }, [sortNum]);

  useEffect(() => {
    if (keyword) {
      getSearchBoardHandler();
    } else {
      console.log("키워드 변경?");
      getBoardHandler();
    }
  }, [keyword]);

  const handleRowClick = (row) => {
    //ViewPage로 이동
    console.log(row);
    navigate(`/notice/noticeView/${row.original.noticeCode}`);
  };

  return (
    <MainStlye>
      <ContentStyle>
        {boards ? (
          <NoticeTableForList
            columns={columns}
            data={boards}
            onRowClick={handleRowClick}
          />
        ) : null}
      </ContentStyle>
    </MainStlye>
  );
};

export default NoticeList;
