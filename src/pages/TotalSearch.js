import { useSearchParams } from 'react-router-dom';
import '../components/css/totalSearch.css';
import { useEffect } from 'react';

const TotalSearch = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    
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
                <div className='main-center_container_div'>오</div>
                <div className='main-center_container_div'>웅</div>
            </div>
            <div className='main-center_container'>
                <div className='main-center_container_div'>뎅</div>
                <div className='main-center_container_div'>당</div>
            </div>
        </div>
    </div>
    );
}

export default TotalSearch;