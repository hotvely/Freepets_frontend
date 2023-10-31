import { useSearchParams } from 'react-router-dom';
import '../components/css/totalSearch.css';
import { useEffect } from 'react';

const TotalSearch = () => {
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
console.log(search);
    useEffect(() => {
        if(search === null) {
            console.log('?');
        } else {
            console.log(search);
        }
    }, []);

    return (
    <div className='mainBox'>
        <div>
            gdgdgdg
        </div>
    </div>
    );
}

export default TotalSearch;