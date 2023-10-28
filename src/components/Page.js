import { useState } from 'react';
import '../components/css/page.css';
import { Link } from 'react-router-dom';

const Page = ({ page, totalPages }) => {
  const pageCount = 5;
  let num = totalPages % 5;
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
    if(num == 0) {
      setStart(totalPages - 4);
    } else {
      setStart(totalPages - (num - 1));
    }
    
  }
  
    return (
          <div className="paging">
            <ul className="paging-number">
              <li>
                <Link to={'?page=1'} state={1} onClick={() => setStart(1)}>
                  처음 페이지
                </Link>
              </li>
              {start != 1 ? 
              <li>
              <button onClick={prevClick}>
                ◀
              </button>
            </li> : null
            }             
              {Array(pageCount).fill().map((a, i) => (
                start + i <= totalPages ?
                <li key={start+i} className={start + i == page ? 'active' : ''}> 
                  <Link to={`?page=${start+i}`} state={start+i} >
                    {start+i}
                  </Link>
                </li> : null
              ))}
              {start == totalPages - 4 || start == totalPages - (num - 1) ?
               null :
               <li>
              <button onClick={nextClick}>
                ▶
              </button>
            </li>
            }              
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