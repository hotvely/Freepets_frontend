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
  console.log(keyword);
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
    console.log(keyword, searchNum);
    page = 1;

    if (keyword) {
      const response = await getSearchAPI(page, keyword, searchNum);

      console.log(response.data);
      console.log(page);

      if (response.data.noticeList.length > 0) {
        console.log("검색 데이터 있을떄..");
        if (response.data.totalPages < page) {
          page = 1;
          response = await getSearchAPI(page, keyword, searchNum);
        }

        let tempArr = [...response.data.noticeList];
        tempArr = changeDate(tempArr);

        setBoards(tempArr);
        setTotalPages(response.data.totalPages);
      } else {
        console.log("검색 데이터 없을떄....");
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
    console.log("KEYWORD 변경");
    if (keyword) {
      getSearchBoardHandler(page);
    } else {
      console.log("키워드 없어서 강제로 페이지 이동시킴");
      if (page != 1) navigate("../notice/?page=1");
    }
  }, [keyword]);

  useEffect(() => {
    console.log("BOARDS 변경");
  }, [boards]);

  useEffect(() => {
    console.log("PAGE 변경");
    if (keyword) {
      console.log(page);
      getSearchBoardHandler(page);
    } else {
      console.log(page);
      getBoardHandler(page);
    }
  }, [page]);

  const handleRowClick = (row) => {
    //ViewPage로 이동
    console.log(row);
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
