import styled from "styled-components";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCommunityList } from "../../../api/community";
import { dateFormatTrans } from "../../../api/utils";
import CommunityTableForList from "../../../components/Community/CommunityTableForList";

const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 590px;
  text-align: center;
  /* background-color: steelblue; */
  .head-numb {
    color: snow;
    /* display: flex; */
    /* text-align: center; */
    /* align-items: center; */
    /* justify-content: space-around; */
  }
`;

const CommunityList = () => {
  const [commonPost, setcommonPosts] = useState([]);
  // const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchPage = searchParams.get("page");
  const page = searchPage != null ? searchPage : 1;

  const handleRowClick = (row) => {
    //ViewPage로 이동
    navigate(`/community/common/commonview/${row.original.commonCode}`);
  };

  const CommunityListAPI = async () => {
    // 게시글 목록 데이터
    const result = await getCommunityList(page);
    setcommonPosts(result.data.communityList);
    // setcommonPosts([...commonPost, ...result.data]);
  };

  useEffect(() => {
    CommunityListAPI(); // 게시글 목록 조회 호출
  }, [page]);

  const columns = useMemo(
    () => [
      {
        accessor: "commonCode",
        Header: "번호",
      },
      {
        accessor: "commonTitle",
        Header: "제목",
        Cell: ({ value }) => (
          <div style={{ textAlign: "left", width: "250px", cursor: "pointer" }}>
            {value}
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
    ],
    []
  );
  const data = useMemo(
    () =>
      commonPost.map((post) => ({
        commonCode: post.commonCode,
        commonTitle: post.commonTitle,
        nickName: post?.member?.nickname,
        commonDate: dateFormatTrans(post.commonDate),
        commonViewCount: post.commonViewCount,
        commonLikeCount: post.commonLikeCount,
      })),
    [commonPost]
  );
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
