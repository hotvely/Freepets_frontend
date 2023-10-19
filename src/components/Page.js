import '../css/page.css';

const Page = ({page, totalPage, setPage}) => {
  
    return (
          <div className="paging">
            <ul className="paging-number">
              <li>
                <a href="#" id="first">
                  처음 페이지
                </a>
              </li>
              <li>
                <a href="#" id="arrow-left">
                  ◀
                </a>
              </li>
              <li>
                <a href={'?page='+page} className="num">
                  1
                </a>
              </li>
              <li>
                <a href="#" className="num">
                  2
                </a>
              </li>
              <li>
                <a href="#" className="num">
                  3
                </a>
              </li>
              <li>
                <a href="#" className="num">
                  4
                </a>
              </li>
              <li>
                <a href="#" className="num">
                  5
                </a>
              </li>
              <li>
                <a href="#" className="num">
                  6
                </a>
              </li>
              <li>
                <a href="#" className="num">
                  7
                </a>
              </li>
              <li>
                <a href="#" className="num">
                  8
                </a>
              </li>
              <li>
                <a href="#" className="num">
                  9
                </a>
              </li>
              <li>
                <a href="#" className="num">
                  10
                </a>
              </li>
              <li>
                <a href="#" className="arrow-right">
                  ▶
                </a>
              </li>
              <li>
                <a href="#" id="last">
                  마지막 페이지
                </a>
              </li>
            </ul>
          </div>
    )
}

export default Page;