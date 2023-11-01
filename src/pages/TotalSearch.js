import { useSearchParams, Link } from 'react-router-dom';
import '../components/css/totalSearch.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const TotalSearch = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    const [noticeList, setNoticeList] = useState([]);
    const [communityList, setCommunityList] = useState([]);
    const [sitterList, setSitterList] = useState([]);
    const [hospitalList, setHospitalList] = useState([]);

    // const get 
    
    useEffect(() => {
        if(search === null) {
            console.log('?');
        } else {
            console.log(search);
        }
    }, []);

    return (
    <div className='mainBox'>
        <div className='main-top'>
            <div><span id='search'>{search}</span>에 대한 검색 결과입니다.</div>
        </div>
        <div className='main-center'>
            <div className='main-center_container'>
                <div className='main-center_container_div'>
                    <div className="container">
                        <p id='title'>공지사항</p>
                    </div>
                    <div className='board'>
                        <div>동물에 관한 공지 강낭콩</div>
                        <div>동물 단체에 공지 당나귀</div>
                    </div>
                    <Link to="../notice">
                        <div className='moveBoard'>공지사항 더 보기 <FontAwesomeIcon icon={faArrowRight}/></div>
                    </Link>
                </div>
                <div className='main-center_container_div'>
                    <div className='container'>
                        <p id='title'>시터</p>
                    </div>
                    <div className='board'>
                        <div>동물에 관한 공지 강낭콩</div>
                        <div>동물 단체에 공지 당나귀</div>
                    </div>
                    <Link to="../sitter">
                        <div className='moveBoard'>시터 더 보기 <FontAwesomeIcon icon={faArrowRight}/></div>
                    </Link>
                </div>
            </div>
            <div className='main-center_container'>
                <div className='main-center_container_div'>
                    <div className='container'>
                        <p id='title'>커뮤니티</p>
                    </div>
                    <div className='board'>
                        <div>동물에 관한 공지 강낭콩</div>
                        <div>동물 단체에 공지 당나귀</div>
                    </div>
                    <Link to="../community">
                        <div>커뮤니티 더 보기 <FontAwesomeIcon icon={faArrowRight}/></div>
                    </Link>
                </div>
                <div className='main-center_container_div'>
                    <div className='container'>
                        <p id='title'>병원 정보</p>
                    </div>
                    <div className='board'>
                        <div>동물에 관한 공지 강낭콩</div>
                        <div>동물 단체에 공지 당나귀</div>
                    </div>
                    <Link to="../hospital">
                        <div>병원 정보 더 보기 <FontAwesomeIcon icon={faArrowRight}/></div>
                    </Link>
                </div>
            </div>
        </div>
    </div>);
}

export default TotalSearch;