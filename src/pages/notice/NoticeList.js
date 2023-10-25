import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import NoticeTableForList from "./NoticeTableForList";
import { getBoardsByPageAPI, getSearchAPI } from "../../api/notice";
import { useNavigate } from "react-router-dom";
import { dateFormatDefault } from "../../api/utils";

const MainStlye = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
  margin: 30px;
  width: 100%;
  div {
    display: flex;
    justify-content: space-around;
  }
`;

const NoticeList = (props) => {
  const [boards, setBoards] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  // const [data, setData] = useState([]);
  const [columns, setColumns] = useState([
    { accessor: "noticeCode", Header: "게시글번호" },
    { accessor: "noticeTitle", Header: "제목" },
    { accessor: "member.nickname", Header: "작성자" },
    { accessor: "noticeDate", Header: "작성일" },
    { accessor: "noticeViews", Header: "조회수" },
    { accessor: "noticeLike", Header: "좋아요" },
  ]);
  const page = 1;
  const sortNum = props.props.sortNum;
  const keyword = props.props.searchKey;
  const searchNum = props.props.searchNum;

  const changeDate = (tempArr) => {
    for (const item in tempArr) {
      tempArr[item].noticeDate = dateFormatDefault(tempArr[item].noticeDate);
    }
    return tempArr;
  };

  const getBoardHandler = async () => {
    const response = await getBoardsByPageAPI(page, sortNum);

    let tempArr = [...response.data.noticeList];
    tempArr = [...changeDate(tempArr)];

    setBoards(tempArr);

    // setTotalPages(response.data.totalPages);
  };

  const getSearchBoardHandler = async () => {
    // 검색기능..
    console.log(keyword, searchNum);
    const response = await getSearchAPI(keyword, searchNum);

    console.log(response);

    if (response.data.noticeList.length > 0) {
      let tempArr = [...response.data.noticeList];
      tempArr = changeDate(tempArr);

      setBoards(tempArr);
    } else {
      alert("검색 결과가 없습니다.");
      await getBoardHandler();
    }
  };

  useEffect(() => {}, [boards]);

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
