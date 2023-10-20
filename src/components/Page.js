import '../css/page.css';

const Page = ({ total, limit, page, setPage }) => {

  const sumPage = Math.ceil(total / limit);

  const pageClickHandler = (e) => {
    setPage(e.target.innerHTML);
    // console.log(total);
    // console.log(sumPage);
    // console.log(limit);
    // console.log(page);
  }
  
    return (
          <div className="paging">
            <ul className="paging-number">
              <li>
                <button>
                  처음 페이지
                </button>
              </li>
              <li>
                <button>
                  ◀
                </button>
              </li>
              {Array(sumPage).fill().map((a, i) => (
                <li key={i+1}>
                  <button onClick={pageClickHandler}>
                    {i+1}
                  </button>
                </li>
              ))}
              <li>
                <button>
                  ▶
                </button>
              </li>
              <li>
                <button>
                  마지막 페이지
                </button>
              </li>
            </ul>
          </div>
    )
}

export default Page;