import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getCommunityList,
  getSearchCommunityList,
} from "../../../api/community";
import { dateFormatTrans } from "../../../api/utils";
import CommunityTableForList from "../../../components/Community/CommunityTableForList";

const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 470px;
  text-align: center;
  /* background-color: steelblue; */
`;

const CommunityList = (props) => {
  const [commonPost, setcommonPosts] = useState([]);
  // const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchPage = searchParams.get("page");
  const page = searchPage != null ? searchPage : 1;

  const orderBy = props.props.orderBy;

  const handleRowClick = (row) => {
    //ViewPage로 이동
    navigate(`/community/common/commonview/${row.original.commonCode}`);
  };

  const CommunityListAPI = async () => {
    // 게시글 목록 데이터
    const result = await getCommunityList(page, orderBy);
    setcommonPosts(result.data.communityList);
    // setcommonPosts([...commonPost, ...result.data]);
  };

  useEffect(() => {
    CommunityListAPI(); // 게시글 목록 조회 호출
  }, [page, orderBy]);

  const [columns] = useState([
    {
      accessor: "commonCode",
      Header: "번호",
    },
    {
      accessor: "commonTitle",
      Header: "제목",
      Cell: ({ row }) => (
        <div style={{ textAlign: "left", width: "350px", cursor: "pointer" }}>
          {row.original.commonCommentCount > 0 ? (
            <div>
              {row.original.commonTitle}{" "}
              <div style={{ color: "#C70039" }}>
                [ {row.original.commonCommentCount} ]
              </div>
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
    const postData = commonPost.map((post) => ({
      commonCode: post.commonCode,
      commonTitle: post.commonTitle,
      commonCommentCount: post.commonCommentCount,
      nickName: post?.member?.nickname,
      commonDate: dateFormatTrans(post.commonDate),
      commonViewCount: post.commonViewCount,
      commonLikeCount: post.commonLikeCount,
    }));
    setData(postData);
  }, [commonPost]);

  return (
    <ContentStyle>
      <CommunityTableForList
        columns={columns}
        data={data}
        onRowClick={handleRowClick}
      />
      {console.log(data)}
    </ContentStyle>
  );
};
export default CommunityList;
