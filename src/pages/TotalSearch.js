import { useSearchParams, Link, NavLink, useNavigate } from 'react-router-dom';
import '../components/css/totalSearch.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { getTotalSearch } from '../api/totalSearch';

const TotalSearch = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const navigate = useNavigate();
    const [noticeList, setNoticeList] = useState([]);
    const [communityList, setCommunityList] = useState([]);
    const [sitterList, setSitterList] = useState([]);
    const [hospitalList, setHospitalList] = useState([]);

    const getTotalSearchAPI = async () => {
        const result = await getTotalSearch(search);
        setCommunityList(result.data.communityList);
        setSitterList(result.data.sitterList);
        setHospitalList(result.data.hospitalReviewList);
        setNoticeList(result.data.noticeList);
    };
    
    useEffect(() => {
        getTotalSearchAPI();
    }, []);

    return (
    <div className='mainBox'>
        <div className='main-top'>
            <div><span id='search'>{search}</span>에 대한 검색 결과입니다.</div>
        </div>
        {console.log(noticeList)}
        <div className='main-center'>
            <div className='main-center_container'>
                <div className='main-center_container_div'>
                    <div className="container">
                        <p id='title'>공지사항</p>
                    </div>
                    <div className='board'>
                        {noticeList.length !== 0 ? 
                            noticeList.map((item, i) => (
                                i <= 2 ? 
                                <div className='board-list' key={i} id={item.noticeCode} onClick={(e) => {navigate(`../notice/noticeView/${e.currentTarget.id}`)}}>
                                    <div>{item.noticeTitle.split(search)[0]}<span className='keyword'>{search}</span>{item.noticeTitle.split(search)[1]}</div>
                                    <div>{item.member?.nickname}</div>
                                </div> : null
                            )) : <div className='board-list_null'>검색 결과가 없습니다.</div>
                        }                                              
                    </div>
                    <div className='moveBoard'>
                        <Link to="../notice">
                            공지사항 더 보기 <FontAwesomeIcon icon={faArrowRight}/>
                        </Link>
                    </div>
                </div>
                <div className='main-center_container_div'>
                    <div className='container'>
                        <p id='title'>시터</p>
                    </div>
                    <div className='board'>
                        {sitterList.length != 0 ?
                            sitterList.map((item, i) => (
                            i <= 2 ? 
                            <div className='board-list' key={i} id={item.sitterCode} onClick={(e) => {navigate(`../sitter/view/${e.currentTarget.id}`)}}>
                                <div>{item.sitterTitle.split(search)[0]}<span className='keyword'>{search}</span>{item.sitterTitle.split(search)[1]}</div>
                                <div>{item.member?.nickname}</div>
                            </div> : null
                            )) : <div className='board-list_null'>검색 결과가 없습니다.</div>
                        }
                    </div>
                    <div className='moveBoard'>
                        <Link to="../sitter">
                            시터 더 보기 <FontAwesomeIcon icon={faArrowRight}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='main-center_container'>
                <div className='main-center_container_div'>
                    <div className='container'>
                        <p id='title'>커뮤니티</p>
                    </div>
                    <div className='board'>
                        {communityList.length != 0 ?
                            communityList.map((item, i) => (
                            i <= 2 ? 
                            <div className='board-list' key={i} id={item.commonCode} onClick={(e) => {navigate(`../community/common/commonview/${e.currentTarget.id}/undefined`)}}>
                                <div>{item.commonTitle.split(search)[0]}<span className='keyword'>{search}</span>{item.commonTitle.split(search)[1]}</div>
                                <div>{item.member?.nickname}</div>
                            </div> : null
                            )) : <div className='board-list_null'>검색 결과가 없습니다.</div>
                        }
                    </div>
                    <div className='moveBoard'>
                        <Link to="../community">
                            커뮤니티 더 보기 <FontAwesomeIcon icon={faArrowRight}/>
                        </Link>
                    </div>
                </div>
                <div className='main-center_container_div'>
                    <div className='container'>
                        <p id='title'>병원 정보</p>
                    </div>
                    <div className='board'>
                        {hospitalList.length != 0 ?
                            hospitalList.map((item, i) => (
                            i <= 2 ? 
                            <div className='board-list' key={i} id={item.hospitalReviewCode} onClick={(e) => {navigate(`../hospital/view/${e.currentTarget.id}`)}}>
                                <div>{item.hospitalReviewTitle.split(search)[0]}<span className='keyword'>{search}</span>{item.hospitalReviewTitle.split(search)[1]}</div>
                                <div>{item.member?.nickname}</div>
                            </div> : null
                            )) : <div className='board-list_null'>검색 결과가 없습니다.</div>
                        }
                    </div>
                    <div className='moveBoard'>
                        <Link to="../hospital">
                            병원 정보 더 보기 <FontAwesomeIcon icon={faArrowRight}/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default TotalSearch;