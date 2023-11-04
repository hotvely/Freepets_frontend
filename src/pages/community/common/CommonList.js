import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getCommunityList,
  getSearchCommunityList,
} from "../../../api/community";
import { dateFormatTrans } from "../../../api/utils";
import CommunityTableForList from "../../../components/Community/CommunityTableForList";
import Page from "../../../components/Page";
import { useSelector, useDispatch } from "react-redux";
import { getTokenCookie } from "../../../api/cookie";
import { userLogout } from "../../../components/store/userSlice";

const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 580px;
  text-align: center;
  /* background-color: steelblue; */

  .main-bottom {
    margin: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* border-top: 1px solid #3a98b9; */

    .paging-bar {
      flex-grow: 1;
      text-align: center;
    }
    #write-btn {
      /* display: flex;
      justify-content: end; */
      button {
        font-weight: bold;
        color: #3a98b9;
        width: 80px;
        height: 40px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
      }
    }
  }
`;

const CommunityList = (props) => {
  const [commonPost, setcommonPosts] = useState([]);
  // const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchPage = searchParams.get("page");
  const page = searchPage != null ? searchPage : 1;
  const orderBy = props.props.orderBy;
  const searchType = props.props.searchType;
  const searchKeyword = props.props.searchKeyword;
  const [totalPages, setTotalPages] = useState();
  const dispatch = useDispatch();

  const user = useSelector((state) => {
    if (getTokenCookie() != undefined) {
      console.log("쿠키 있!");
      if (state.user != {}) {
        return state.user;
      }
      return JSON.parse(localStorage.getItem("user"));
    } else {
      if (localStorage.getItem("user")) {
        console.log("호출..?");
        dispatch(userLogout());
      }
    }
  });

  const handleRowClick = (row) => {
    //ViewPage로 이동
    navigate(
      `/community/common/commonview/${row.original.commonCode}/${props.props.ListBtn}`
    );
  };

  const CommunityListAPI = async () => {
    // 게시글 목록 데이터
    const result = await getCommunityList(page, orderBy);
    setcommonPosts(result.data.communityList);
    setTotalPages(result.data.totalPages);
    // setcommonPosts([...commonPost, ...result.data]);
  };

  const CommunitySearchListAPI = async () => {
    try {
      const result = await getSearchCommunityList(
        page,
        searchKeyword,
        searchType
      );
      setcommonPosts(result.data.communityList);
      setTotalPages(result.data.totalPages);
    } catch (error) {
      console.error("검색 에러: ", error);
    }
  };

  const navWrite = () => {
    navigate("/community/common/create");
  };

  useEffect(() => {
    if (searchKeyword != null) {
      CommunitySearchListAPI();
    } else {
      CommunityListAPI(); // 게시글 목록 조회 호출
    }
  }, [page, orderBy, searchKeyword, searchType]);

  const [columns] = useState([
    {
      accessor: "commonCode",
      Header: "번호",
    },
    {
      accessor: "commonTitle",
      Header: "제목",
      Cell: ({ row }) => (
        <div
          style={{
            textAlign: "left",
            width: "350px",
            cursor: "pointer",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "350px",
          }}
        >
          {row.original.commonCommentCount > 0 ? (
            <div>
              {row.original.commonTitle}{" "}
              <span style={{ color: "#C70039" }}>
                [ {row.original.commonCommentCount} ]
              </span>
            </div>
          ) : (
            <div>{row.original.commonTitle}</div>
          )}
        </div>
      ),
    },
    { accessor: "nickName", Header: "작성자" },
    { accessor: "commonDate", Header: "작성일" },
    {
      accessor: "commonViewCount",
      Header: "조회수",
    },
    {
      accessor: "commonLikeCount",
      Header: "좋아요",
    },
  ]);

  const [data, setData] = useState([]);

  useEffect(() => {
    if (commonPost) {
      const postData = commonPost?.map((post) => ({
        commonCode: post.commonCode,
        commonTitle: post.commonTitle,
        commonCommentCount: post.commonCommentCount,
        nickName: post?.member?.nickname,
        commonDate: dateFormatTrans(post.commonDate),
        commonViewCount: post.commonViewCount,
        commonLikeCount: post.commonLikeCount,
      }));
      setData(postData);
    }
  }, [commonPost]);

  return (
    <ContentStyle>
      {commonPost?.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          검색 결과가 없습니다.
        </div>
      ) : (
        <CommunityTableForList
          columns={columns}
          data={data}
          onRowClick={handleRowClick}
        />
      )}
      <div className="main-bottom">
        <div className="paging-bar">
          <Page totalPages={totalPages} page={page} />
        </div>
        {user !== undefined ?
          <div id="write-btn">
            <button onClick={navWrite}>글쓰기</button>
          </div> : null
        }
      </div>
    </ContentStyle>
  );
};
export default CommunityList;
