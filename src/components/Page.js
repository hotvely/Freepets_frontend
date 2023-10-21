import { useState } from 'react';
import '../css/page.css';
import { Link } from 'react-router-dom';

const Page = ({ page, totalPages }) => {
  const pageCount = 5;
  const [start, setStart] = useState(1);
  
  const prevClick = () => {
    if(start > 1) {
      setStart(start - pageCount);
    }
  }

  const nextClick = () => {
    if(start + pageCount <= totalPages) {
      setStart(start + pageCount);
    }
  }

  const lastPage = () => {
    let num = (totalPages % 5) - 1;
    setStart(totalPages - num);
  }
  
    return (
          <div className="paging">
            <ul className="paging-number">
              <li>
                <Link to={'?page=1'} state={1} onClick={() => setStart(1)}>
                  처음 페이지
                </Link>
              </li>
              <li>
                <button onClick={prevClick}>
                  ◀
                </button>
              </li>
              {Array(pageCount).fill().map((a, i) => (
                start + i <= totalPages ?
                <li key={start+i} className={start + i == page ? 'active' : ''}> 
                  <Link to={`?page=${start+i}`} state={start+i} >
                    {start+i}
                  </Link>
                </li> : null
              ))}
              <li>
                <button onClick={nextClick}>
                  ▶
                </button>
              </li>
              <li>
                <Link to={`?page=${totalPages}`} state={totalPages} onClick={lastPage}>
                  마지막 페이지
                </Link>
              </li>
            </ul>
          </div>
    )
}

export default Page;