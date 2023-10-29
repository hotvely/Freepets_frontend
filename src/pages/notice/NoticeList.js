import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import NoticeTableForList from "./NoticeTableForList";
import { getBoardsByPageAPI, getSearchAPI } from "../../api/notice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { dateFormatDefault } from "../../api/utils";
import Page from "../../components/Page";
import { faKorvue } from "@fortawesome/free-brands-svg-icons";

const MainStlye = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  align-items: center;
  margin: 0;
  width: 90%;
  div {
    display: flex;
    justify-content: space-around;
  }
`;

const NoticeList = (props) => {
  const [boards, setBoards] = useState([]);
  const [totalPages, setTotalPages] = useState();
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
  const [searchParams] = useSearchParams();
  const searchPage = searchParams.get("page");
  let page = searchPage != null ? searchPage : 1;

  let sortNum = props.props.sortNum;
  let keyword = props.props.keyword == "" ? null : props.props.keyword;
  let searchNum = props.props.searchNum;
  const changeDate = (tempArr) => {
    for (const item in tempArr) {
      tempArr[item].noticeDate = dateFormatDefault(tempArr[item].noticeDate);
    }
    return tempArr;
  };

  const getBoardHandler = async (page) => {
    const response = await getBoardsByPageAPI(page, sortNum);

    let tempArr = [...response.data.noticeList];
    tempArr = [...changeDate(tempArr)];

    setBoards(tempArr);

    setTotalPages(response.data.totalPages);
  };

  const getSearchBoardHandler = async (page) => {
    // 검색기능..

    page = 1;

    if (keyword) {
      const response = await getSearchAPI(page, keyword, searchNum);

      if (response.data.noticeList.length > 0) {
        if (response.data.totalPages < page) {
          page = 1;
          response = await getSearchAPI(page, keyword, searchNum);
        }

        let tempArr = [...response.data.noticeList];
        tempArr = changeDate(tempArr);

        setBoards(tempArr);
        setTotalPages(response.data.totalPages);
      } else {
        document.querySelector("#search").value = "";
        props.props.setKeyword(null);
        page = 1;
        navigate("../notice?page=1");
        // getBoardHandler(page, sortNum);
      }
    } else {
      alert("검색어를 입력하세요.");
    }
  };

  useEffect(() => {}, [boards]);

  useEffect(() => {
    if (page <= 1) getBoardHandler(1);
  }, []);

  useEffect(() => {
    getBoardHandler(1);
  }, [sortNum]);

  useEffect(() => {
    if (keyword) {
      getSearchBoardHandler(page);
    } else {
      if (page != 1) navigate("../notice/?page=1");
    }
  }, [keyword]);

  useEffect(() => {}, [boards]);

  useEffect(() => {
    if (keyword) {
      getSearchBoardHandler(page);
    } else {
      getBoardHandler(page);
    }
  }, [page]);

  const handleRowClick = (row) => {
    //ViewPage로 이동

    navigate(`/notice/noticeView/${row.original.noticeCode}`);
  };

  return (
    <MainStlye>
      <ContentStyle className="content">
        {boards ? (
          <NoticeTableForList
            columns={columns}
            data={boards}
            onRowClick={handleRowClick}
          />
        ) : null}
      </ContentStyle>
      <Page totalPages={totalPages} page={page} />
    </MainStlye>
  );
};

export default NoticeList;
